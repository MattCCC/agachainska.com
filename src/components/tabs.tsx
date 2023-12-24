import {
    useState,
    RefObject,
    useRef,
    useCallback,
    memo,
    HTMLAttributes,
    useEffect,
    useMemo,
} from "react";

import tw, { css, styled } from "twin.macro";

interface TabsStyled {
    hideForDesktop?: boolean;
    isInsideContainer?: boolean;
}

interface TabStyled {
    isActive?: boolean;
}

interface SingleTab {
    title: string;
    id: string;
}

interface Props extends HTMLAttributes<HTMLElement> {
    tabs: SingleTab[];
    activeTabId?: string;
    hideForDesktop?: boolean;
    isInsideContainer?: boolean;
    onTabChange?: (tab: SingleTab) => void;
}

const TabsWrapper = styled.nav(
    ({ hideForDesktop = false, isInsideContainer = true }: TabsStyled) => [
        tw`sticky top-0 flex items-center ml-[-15px] w-[calc(100%+30px)] h-16 mb-8 z-100 max-w-[100vw] overflow-x-auto overflow-y-hidden`,
        hideForDesktop && tw`lg:hidden`,
        !isInsideContainer && tw`pl-[15px] max-w-[calc(100vw+15px)]`,
    ]
);

const TabsWrapperTop = styled.div(() => [
    tw`h-[1px] after:h-16 after:content-[""]`,
]);

const TabsListContainer = styled.div(() => [
    tw`relative h-[2.3rem] px-[15px] w-[100vw]`,
    tw`overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`,
]);

const TabsList = styled.menu(() => [
    tw`relative flex flex-row justify-between`,
]);

const Tab = styled.li(({ isActive = false }: TabStyled) => [
    tw`w-full h-8 ml-0 capitalize list-none transition-opacity cursor-pointer select-none text-melrose-40 text-opacity-40`,
    tw`min-w-[120px] leading-[25px] text-[20px]`,
    isActive && tw`text-opacity-100 text-melrose`,
    isActive
        ? css`
              text-shadow: 0 2px 4px 0 var(--melrose);
          `
        : css`
              text-shadow: 0 2px 4px 0 var(--melrose-40);
          `,
    css`
        box-shadow: inset 0px -2px 1px -1px var(--melrose-40);
    `,
]);

const Progress = styled.div(() => [
    tw`absolute left-0 h-px top-8 bg-melrose z-[2]`,
    css`
        transition: left 0.3s ease;
        box-shadow: 0 2px 4px 0 var(--melrose);

        &:after {
            ${tw`block content-[""] w-full absolute left-0 right-0 h-px`}
            box-shadow: inset 0px -2px 1px -1px var(--melrose);
        }
    `,
]);

const threshold = [0, 1];

export const Tabs = memo(
    ({
        tabs,
        activeTabId = "",
        onTabChange = (): null => null,
        hideForDesktop = false,
        isInsideContainer = true,
    }: Props) => {
        const wrapperTopRef = useRef() as RefObject<HTMLDivElement>;
        const wrapperRef = useRef() as RefObject<HTMLDivElement>;

        const [tabId, setTabId] = useState("");
        const [pinX, setPinX] = useState(0);
        const [tabWidth, setTabWidth] = useState(0);

        const activeTabIndex = useMemo(
            () => tabs?.findIndex((tab) => tab.id === tabId),
            [tabId, tabs]
        );

        useEffect(() => {
            setTabId(activeTabId || tabs[0]?.id || "");
        }, [activeTabId, tabs]);

        useEffect(() => {
            const currentElement = wrapperTopRef.current;
            const observer = new IntersectionObserver(
                ([e]) => {
                    if (!wrapperRef.current) {
                        return;
                    }
                    const areTabsIntersectingContent = !e?.intersectionRatio;

                    if (areTabsIntersectingContent) {
                        wrapperRef.current.style.backgroundColor =
                            "rgba(255, 255, 255, 0.92)";
                        wrapperRef.current.style.backdropFilter = "blur(60px)";
                        wrapperRef.current.style.boxShadow =
                            "0px 14px 60px 0px rgba(0, 0, 0, 0.25)";
                    } else {
                        wrapperRef.current.style.backgroundColor = "";
                        wrapperRef.current.style.backdropFilter = "";
                        wrapperRef.current.style.boxShadow = "";
                    }
                },
                {
                    threshold,
                }
            );

            if (currentElement) {
                observer.observe(currentElement);
            }

            return () => {
                if (currentElement) {
                    observer.unobserve(currentElement);
                }
            };
        }, [wrapperTopRef]);

        const onTabClick = useCallback(
            (tab: SingleTab) => {
                if (tabId === tab.id) {
                    return;
                }

                setTabId(tab.id);

                onTabChange(tab);
            },
            [onTabChange, tabId]
        );

        useEffect(() => {
            const el = document.getElementById("tab-" + tabId);

            if (el) {
                const width = el.clientWidth;
                const tabListContainerPaddingLeft = 15;

                setTabWidth(width - tabListContainerPaddingLeft);
                setPinX(
                    width * (activeTabIndex + 1) -
                        width +
                        tabListContainerPaddingLeft
                );
            }
        }, [activeTabIndex, tabId]);

        return (
            <>
                <TabsWrapperTop ref={wrapperTopRef} />
                <TabsWrapper
                    ref={wrapperRef}
                    hideForDesktop={hideForDesktop}
                    isInsideContainer={isInsideContainer}
                >
                    <TabsListContainer>
                        <TabsList key="tab-list">
                            {tabs.map((tab) => (
                                <Tab
                                    id={`tab-${tab.id}`}
                                    key={`tab-${tab.id}`}
                                    isActive={tab.id === tabId}
                                    onClick={onTabClick.bind(null, tab)}
                                >
                                    {tab.title}
                                </Tab>
                            ))}
                        </TabsList>
                        <Progress
                            style={{ width: `${tabWidth}px`, left: pinX }}
                        />
                    </TabsListContainer>
                </TabsWrapper>
            </>
        );
    },
    (prevProps, nextProps) =>
        prevProps.tabs.length === nextProps.tabs.length &&
        prevProps.activeTabId === nextProps.activeTabId
);
