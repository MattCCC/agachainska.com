import {
    useState,
    useEffect,
    RefObject,
    useRef,
    useCallback,
    memo,
    HTMLAttributes,
} from "react";

import tw, { css, styled } from "twin.macro";

import { motion, MotionProps, AnimatePresence } from "@components/animation";
import { useElementSize } from "@hooks/element-size";
import { usePreviousContext } from "@hooks/use-previous-context";

/**
 * Style
 */
const TabsWrapper = styled.div(() => [tw`flex flex-row w-full justify-between`]);

const Tab = styled.div(({ isActive = false }: TabStyled) => [
    tw`prose-20px w-full h-8 opacity-30 select-none cursor-pointer`,
    tw`hover:opacity-100 transition-opacity`,
    isActive && tw`opacity-100`,
    css`
        color: var(--melrose-color);
        line-height: 25px;
        box-shadow: inset 0px -2px 1px -1px var(--melrose-color);
        text-shadow: 0 2px 4px 0 rgba(var(--melrose-color),0.7)`
]);

const Pin = styled(motion.div)(() => [
    tw`absolute left-0 top-8 h-px`,
    css`
        z-index: 2;
        background-color: var(--melrose-color);
        box-shadow: 0 2px 4px 0 var(--melrose-color)
    `,
]);

/**
 * Interfaxces
 */
interface TabStyled extends MotionProps {
    isActive?: boolean;
}

export interface Item {
    name: string;
    id: string;
    routeTo: string;
    cover: string;
    category: string;
}

export interface Section {
    title: string;
    id: string;
    items?: Item[];
}

interface Props extends HTMLAttributes<HTMLElement> {
    sections: Section[];
    activeSectionId?: string;
    activeItemId?: string;
    onTabChange?: (section: Section) => void;
}

/**
 * Component
 * @param props
 */
export const TabsBar = memo(
    ({
        sections,
        activeSectionId = "",
        activeItemId = "",
        onTabChange = (): null => null,
        ...props
    }: Props): JSX.Element => {
        const wrapperRef = useRef() as RefObject<HTMLDivElement>;
        const sectionTabRef = useRef() as RefObject<HTMLDivElement>;
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

        const tabWidth = wrapperWidth / sections.length;

        const previousProps = usePreviousContext({
            activeSectionId,
            activeItemId,
        });

        const [state, setState] = useState({
            sectionId: activeSectionId || activeSections[0]?.id || "",
            activeId: activeItemId || allItems[0]?.id || "",
        });

        useEffect(() => {
            if (
                previousProps &&
                activeSectionId &&
                activeItemId &&
                (activeSectionId !== previousProps.activeSectionId ||
                    activeItemId !== previousProps.activeItemId)
            ) {
                setState({
                    ...state,
                    sectionId: activeSectionId,
                    activeId: activeItemId,
                });
            }
        }, [activeItemId, activeSectionId, previousProps, state]);

        const onTimelineItemClick = useCallback(
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
                <AnimatePresence initial={false}>
                    {
                        sections.map((section: Section, index: number) => (
                            <Tab ref={sectionTabRef} key={`tab-${index}`}
                                isActive={section.id === state.sectionId}
                                onClick={onTimelineItemClick.bind(
                                    null,
                                    section
                                )}>{section.title}</Tab>
                        ))
                    }
                    <Pin
                        animate={{
                            x: Math.max(
                                0,
                                (tabWidth *
                                    (sections?.findIndex(
                                        (item) =>
                                            item.id === state.sectionId
                                    ) || 0)
                                ),
                            )
                        }}
                        style={{
                            width: tabWidth,
                        }}
                    />
                </AnimatePresence>
            </TabsWrapper>
        );
    },
    (prevProps, nextProps) =>
        prevProps.sections.length === nextProps.sections.length &&
        prevProps.activeSectionId === nextProps.activeSectionId &&
        prevProps.activeItemId === nextProps.activeItemId
);
