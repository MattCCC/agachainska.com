import {
    useState,
    RefObject,
    useRef,
    useCallback,
    memo,
    HTMLAttributes,
    useEffect,
} from "react";

import tw, { css, styled } from "twin.macro";

import { motion, MotionProps, AnimatePresence } from "@components/animation";

interface TabsStyled {
    hideForDesktop?: boolean;
}

interface TabsListContainer {
    isSticky: boolean;
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

const TabsWrapper = styled.div(({ hideForDesktop = false }: TabsStyled) => [
    tw`h-16 sticky mb-8 top-0 z-100 w-full flex items-center justify-center`,
    hideForDesktop && tw`lg:hidden`,
]);

const TabsListContainer = styled.div(
    ({ isSticky = false }: TabsListContainer) => [
        tw`relative h-8 `,
        css`
            width: calc(100vw - 32px);
        `,
        isSticky &&
            css`
                &:after {
                    content: "";
                    width: 100vw;
                    height: 4rem;
                    background: rgba(255, 255, 255, 0.92);
                    box-shadow: 0px 14px 60px 0px rgba(0, 0, 0, 0.25);
                    transition: all 0.2s ease-in;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: -1;
                }
            `,
    ]
);

const TabsList = styled.ul(() => [tw`flex flex-row justify-between`]);

const Tab = styled.li(({ isActive = false }: TabStyled) => [
    tw`w-full h-8 cursor-pointer select-none prose-20px opacity-40`,
    tw`transition-opacity capitalize text-melrose`,
    isActive && tw`opacity-100`,
    css`
        line-height: 25px;
        box-shadow: inset 0px -2px 1px -1px var(--melrose-color);
        text-shadow: 0 2px 4px 0 var(--melrose-color);
    `,
]);

const Pin = styled(motion.div)(() => [
    tw`absolute left-0 h-px top-8 bg-melrose`,
    css`
        z-index: 2;
        box-shadow: 0 2px 4px 0 var(--melrose-color);
    `,
]);

export const Tabs = memo(
    ({
        children,
        tabs,
        activeTabId = "",
        onTabChange = (): null => null,
        ...props
    }: Props): JSX.Element => {
        const wrapperRef = useRef() as RefObject<HTMLDivElement>;

        const [tabsAreSticky, setTabsAreSticky] = useState(false);

        const [state, setState] = useState({
            tabId: activeTabId || tabs[0]?.id || "",
        });

        const activeTabIndex = tabs?.findIndex((tab) => tab.id === state.tabId);

        const tabWidth = 100 / tabs.length;
        const pinX = tabWidth * (activeTabIndex + 1) - tabWidth + "%";

        useEffect(() => {
            if (tabsAreSticky) {
                setState((prevState) => {
                    if (activeTabId === prevState.tabId) {
                        return prevState;
                    }

                    return {
                        ...prevState,
                        tabId:
                            activeTabId !== prevState.tabId
                                ? activeTabId
                                : prevState.tabId,
                    };
                });
            } else {
                setState({ tabId: tabs[0].id });
            }
        }, [tabsAreSticky, activeTabId, tabs]);

        useEffect(() => {
            const currentElement = wrapperRef.current;
            const observer = new IntersectionObserver(
                ([e]) => setTabsAreSticky(e.isIntersecting),
                { rootMargin: "0px 0px -90% 0px", threshold: 1 }
            );

            if (currentElement) {
                observer.observe(currentElement);
            }

            return function () {
                if (currentElement) {
                    observer.unobserve(currentElement);
                }
            };
        }, [wrapperRef]);

        const onTabClick = useCallback(
            (tab: SingleTab) => {
                if (state.tabId === tab.id) {
                    return;
                }

                setState({
                    ...state,
                    tabId: tab.id,
                });

                onTabChange(tab);
            },
            [onTabChange, state]
        );

        return (
            <TabsWrapper ref={wrapperRef} {...props}>
                <TabsListContainer isSticky={tabsAreSticky}>
                    <TabsList>
                        <AnimatePresence initial={false}>
                            {tabs.map((tab: SingleTab, index: number) => (
                                <Tab
                                    key={`tab-${index}`}
                                    isActive={tab.id === state.tabId}
                                    onClick={onTabClick.bind(null, tab)}
                                >
                                    {tab.title}
                                </Tab>
                            ))}
                            <Pin
                                animate={{ left: pinX }}
                                style={{ width: `${100 / tabs.length}%` }}
                            />
                        </AnimatePresence>
                    </TabsList>
                </TabsListContainer>
            </TabsWrapper>
        );
    },
    (prevProps, nextProps) =>
        prevProps.tabs.length === nextProps.tabs.length &&
        prevProps.activeTabId === nextProps.activeTabId
);
