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

import { motion, MotionProps, AnimatePresence } from "framer-motion";

interface TabsStyled {
    hideForDesktop?: boolean;
    isIntersecting: boolean;
}

interface TabStyled extends MotionProps {
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
    onTabChange?: (tab: SingleTab) => void;
}

const TabsWrapper = styled.div(
    ({ hideForDesktop = false, isIntersecting = false }: TabsStyled) => [
        tw`sticky top-0 flex items-center w-full h-16 mb-8 z-100`,
        hideForDesktop && tw`lg:hidden`,
        isIntersecting &&
            css`
                &:after {
                    ${tw`content-[""] w-full min-w-[100vw] h-16 top-1/2 left-1/2 absolute`}

                    background: rgba(255, 255, 255, 0.92);
                    backdrop-filter: blur(60px);
                    box-shadow: 0px 14px 60px 0px rgba(0, 0, 0, 0.25);
                    transition: all 0.2s ease-in;
                    transform: translate(-50%, -50%);
                    z-index: -1;
                }
            `,
    ],
);

const TabsWrapperTop = styled.div(() => [tw`h-[1px]`]);

const TabsListContainer = styled.div(() => [
    tw`relative h-8 px-[15px] w-[100vw]`,
    tw`overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`,
]);

const TabsList = styled.ul(() => [tw`relative flex flex-row justify-between`]);

const Tab = styled.li(({ isActive = false }: TabStyled) => [
    tw`w-full h-8 capitalize transition-opacity cursor-pointer select-none text-melrose-40 text-opacity-40 list-none`,
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

const Progress = styled(motion.div)(() => [
    tw`absolute left-0 h-px top-8 bg-melrose z-[2]`,
    css`
        box-shadow: 0 2px 4px 0 var(--melrose);

        &:after {
            ${tw`block content-[""] w-full absolute left-0 right-0 h-[1px]`}
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
    }: Props) => {
        const wrapperRef = useRef() as RefObject<HTMLDivElement>;

        const [areTabsIntersectingContent, setTabsIntersecting] =
            useState(false);
        const [tabId, setTabId] = useState("");
        const [pinX, setPinX] = useState("0%");
        const [tabWidth, setTabWidth] = useState(0);

        const activeTabIndex = useMemo(
            () => tabs?.findIndex((tab) => tab.id === tabId),
            [tabId, tabs],
        );

        useEffect(() => {
            setTabId(activeTabId || tabs[0]?.id || "");
        }, [activeTabId, tabs]);

        useEffect(() => {
            setTabWidth(100 / tabs.length);
        }, [tabs]);

        useEffect(() => {
            setPinX(tabWidth * (activeTabIndex + 1) - tabWidth + "%");
        }, [activeTabId, activeTabIndex, tabWidth]);

        useEffect(() => {
            const currentElement = wrapperRef.current;
            const observer = new IntersectionObserver(
                ([e]) => {
                    setTabsIntersecting(!e?.intersectionRatio);
                },
                {
                    threshold,
                },
            );

            if (currentElement) {
                observer.observe(currentElement);
            }

            // eslint-disable-next-line space-before-function-paren
            return function () {
                if (currentElement) {
                    observer.unobserve(currentElement);
                }
            };
        }, [wrapperRef]);

        const onTabClick = useCallback(
            (tab: SingleTab) => {
                if (tabId === tab.id) {
                    return;
                }

                setTabId(tab.id);

                onTabChange(tab);
            },
            [onTabChange, tabId],
        );

        return (
            <>
                <TabsWrapperTop ref={wrapperRef} />
                <TabsWrapper
                    hideForDesktop={hideForDesktop}
                    isIntersecting={areTabsIntersectingContent}
                >
                    <TabsListContainer>
                        <AnimatePresence initial={false}>
                            <TabsList key="tab-list">
                                {tabs.map((tab, index) => (
                                    <Tab
                                        key={`tab-${index}`}
                                        isActive={tab.id === tabId}
                                        onClick={onTabClick.bind(null, tab)}
                                    >
                                        {tab.title}
                                    </Tab>
                                ))}
                            </TabsList>
                            <Progress
                                animate={{ left: pinX }}
                                style={{ width: `${100 / tabs.length}%` }}
                            />
                        </AnimatePresence>
                    </TabsListContainer>
                </TabsWrapper>
            </>
        );
    },
    (prevProps, nextProps) =>
        prevProps.tabs.length === nextProps.tabs.length &&
        prevProps.activeTabId === nextProps.activeTabId,
);
