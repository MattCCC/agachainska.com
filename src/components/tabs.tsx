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

interface PropsTabContainer {
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

const TabsWrapper = styled.div(({ hideForDesktop = false }: TabsStyled) => [
    tw`sticky top-0 flex items-center justify-center w-full h-16 mb-8 z-100`,
    hideForDesktop && tw`lg:hidden`,
]);

const TabsListContainer = styled.div(
    ({ isIntersecting = false }: PropsTabContainer) => [
        tw`relative h-8 `,
        css`
            width: calc(100vw - 32px);
        `,
        isIntersecting &&
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
    tw`w-full h-8 leading-7 cursor-pointer select-none prose-20 opacity-40`,
    tw`capitalize transition-opacity text-melrose`,
    isActive && tw`opacity-100`,
    css`
        line-height: 25px;
        box-shadow: inset 0px -2px 1px -1px var(--melrose);
        text-shadow: 0 2px 4px 0 var(--melrose);
    `,
]);

const Pin = styled(motion.div)(() => [
    tw`absolute left-0 h-px top-8 bg-melrose`,
    css`
        z-index: 2;
        box-shadow: 0 2px 4px 0 var(--melrose);
    `,
]);

export const Tabs = memo(
    ({
        tabs,
        activeTabId = "",
        onTabChange = (): null => null,
        ...props
    }: Props): JSX.Element => {
        const wrapperRef = useRef() as RefObject<HTMLDivElement>;

        const [areTabsIntersectingContent, setTabsIntersecting] =
            useState(false);

        const [state, setState] = useState({
            tabId: activeTabId || tabs[0]?.id || "",
        });

        const [pinX, setPinX] = useState("0%");
        const [tabWidth, setTabWidth] = useState(0);
        const [activeTabIndex, setActiveTabIndex] = useState(0);

        useEffect(() => {
            setActiveTabIndex(tabs?.findIndex((tab) => tab.id === state.tabId));
        }, [state.tabId, tabs]);

        useEffect(() => {
            setTabWidth(100 / tabs.length);
        }, [tabs]);

        useEffect(() => {
            setPinX(tabWidth * (activeTabIndex + 1) - tabWidth + "%");
        }, [activeTabId, activeTabIndex, tabWidth]);

        useEffect(() => {
            if (areTabsIntersectingContent) {
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
            }
        }, [areTabsIntersectingContent, activeTabId]);

        useEffect(() => {
            const currentElement = wrapperRef.current;
            const observer = new IntersectionObserver(
                ([e]) => {
                    setTabsIntersecting(e.isIntersecting);
                },
                { rootMargin: "0px 0px -90% 0px", threshold: 1 }
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
                <TabsListContainer isIntersecting={areTabsIntersectingContent}>
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
