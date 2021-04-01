import {
    useState,
    RefObject,
    useRef,
    useCallback,
    memo,
    HTMLAttributes,
} from "react";

import tw, { css, styled } from "twin.macro";

import { motion, MotionProps, AnimatePresence } from "@components/animation";
import { useElementSize } from "@hooks/use-element-size";

interface TabsStyled {
    hideForDesktop?: boolean;
}

interface TabStyled extends MotionProps {
    isActive?: boolean;
}

interface Item {
    name: string;
    id: string;
    routeTo: string;
    cover: string;
    category: string;
}

interface Section {
    title: string;
    id: string;
    category: string;
    items?: Item[];
}

interface Props extends HTMLAttributes<HTMLElement> {
    sections: Section[];
    activeSectionId?: string;
    activeItemId?: string;
    hideForDesktop?: boolean;
    onTabChange?: (section: Section) => void;
}

const TabsWrapper = styled.div(({ hideForDesktop = false }: TabsStyled) => [
    tw`w-full`,
    hideForDesktop && tw`lg:hidden`,
]);

const TabsList = styled.ul(() => [
    tw`flex flex-row w-full justify-between mb-8`,
]);

const Tab = styled.li(({ isActive = false }: TabStyled) => [
    tw`prose-20px w-full h-8 opacity-30 select-none cursor-pointer`,
    tw`hover:opacity-100 transition-opacity`,
    isActive && tw`opacity-100`,
    css`
        color: var(--melrose-color);
        line-height: 25px;
        box-shadow: inset 0px -2px 1px -1px var(--melrose-color);
        text-shadow: 0 2px 4px 0 var(--melrose-color);
    `,
]);

const Pin = styled(motion.div)(() => [
    tw`absolute left-0 top-8 h-px`,
    css`
        z-index: 2;
        background-color: var(--melrose-color);
        box-shadow: 0 2px 4px 0 var(--melrose-color);
    `,
]);

const TabContent = styled.div(() => []);

export const Tabs = memo(
    ({
        children,
        sections,
        activeSectionId = "",
        activeItemId = "",
        onTabChange = (): null => null,
        ...props
    }: Props): JSX.Element => {
        const wrapperRef = useRef() as RefObject<HTMLDivElement>;
        const activeSections: Section[] = sections.filter(
            (section: Section) => section?.items && section?.items?.length > 0
        );
        const allItems: Item[] = activeSections.reduce(
            (itemsList: Item[], currentValue: Section) => {
                itemsList = [...itemsList, ...(currentValue.items || [])];

                return itemsList;
            },
            []
        );

        const { width: wrapperWidth } = useElementSize(wrapperRef);
        const tabWidth = (wrapperWidth - 14) / sections.length;

        const [state, setState] = useState({
            sectionId: activeSectionId || activeSections[0]?.id || "",
            activeId: activeItemId || allItems[0]?.id || "",
        });

        const onTabClick = useCallback(
            (section: Section) => {
                if (state.sectionId === section.id) {
                    return;
                }

                setState({
                    ...state,
                    sectionId: section.id,
                });

                onTabChange(section);
            },
            [onTabChange, state]
        );

        return (
            <TabsWrapper ref={wrapperRef} {...props}>
                <TabsList>
                    <AnimatePresence initial={false}>
                        {sections.map((section: Section, index: number) => (
                            <Tab
                                key={`tab-${index}`}
                                isActive={section.id === state.sectionId}
                                onClick={onTabClick.bind(null, section)}
                            >
                                {section.title}
                            </Tab>
                        ))}
                        <Pin
                            animate={{
                                x: Math.max(
                                    0,
                                    tabWidth *
                                        (sections?.findIndex(
                                            (item) =>
                                                item.id === state.sectionId
                                        ) || 0)
                                ),
                            }}
                            style={{
                                width: tabWidth,
                            }}
                        />
                    </AnimatePresence>
                </TabsList>
                <TabContent>{children}</TabContent>
            </TabsWrapper>
        );
    },
    (prevProps, nextProps) =>
        prevProps.sections.length === nextProps.sections.length &&
        prevProps.activeSectionId === nextProps.activeSectionId &&
        prevProps.activeItemId === nextProps.activeItemId
);
