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
    tw`w-full overflow-hidden`,
    hideForDesktop && tw`lg:hidden`,
]);

const TabsList = styled.ul(() => [
    tw`flex flex-row justify-between w-full mb-8`,
]);

const Tab = styled.li(({ isActive = false }: TabStyled) => [
    tw`w-full h-8 cursor-pointer select-none prose-20px opacity-40`,
    tw`transition-opacity text-melrose`,
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

        const [state, setState] = useState({
            tabId: activeTabId || tabs[0]?.id || "",
        });

        const activeTabIndex = tabs?.findIndex((tab) => tab.id === state.tabId);

        const tabWidth = 100 / tabs.length;
        const pinX = tabWidth * (activeTabIndex + 1) - tabWidth + "%";

        useEffect(() => {
            setState((prevState) => {
                if ( activeTabId === prevState.tabId ) {
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
        }, [activeTabId, state]);

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
            </TabsWrapper>
        );
    },
    (prevProps, nextProps) =>
        prevProps.tabs.length === nextProps.tabs.length &&
        prevProps.activeTabId === nextProps.activeTabId
);
