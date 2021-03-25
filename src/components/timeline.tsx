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
import { useElementSize } from "@hooks/element-size";

/**
 * Style
 */
const TimelineWrapper = styled.div(() => [tw`text-right w-52 z-10`]);

const Title = styled(motion.div)(
    ({ isActive, hasMultipleSections }: TitleStyle) => [
        tw`lg:prose-20px lg:text-primary-color opacity-30 font-bold`,
        tw`hover:opacity-100 transition-opacity`,
        css`
            padding-bottom: 7px;
            height: 33px;
        `,
        isActive && tw`opacity-100`,
        hasMultipleSections && tw`cursor-pointer`,
    ]
);

const List = styled(motion.div)(() => [
    tw`font-bold lg:prose-14px lg:text-gray-500 w-auto flex flex-col justify-evenly relative items-end overflow-hidden`,
    css`
        box-shadow: inset -1px 0px 1px -1px var(--primary-color);
        transition: opacity 0.3s ease-in-out;
    `,
]);

const ListItem = styled(motion.div)(({ isActive }: ListItemStyle) => [
    tw`relative align-middle ml-auto items-center h-full`,
    tw`lg:text-primary-color flex text-right opacity-30 lg:p-5 select-none cursor-pointer`,
    tw`hover:opacity-100 transition-opacity`,
    isActive && tw`opacity-100`,
]);

const Pin = styled(motion.div)(() => [
    tw`absolute right-0 top-0 bottom-0 w-px`,
    css`
        z-index: 2;
        background-color: var(--primary-color);
    `,
]);

/**
 * Interfaxces
 */
interface TitleStyle extends MotionProps {
    isActive?: boolean;
    hasMultipleSections?: boolean;
}

interface ListItemStyle extends MotionProps {
    isActive?: boolean;
}

export interface Item {
    name: string;
    id: string;
    routeTo: string;
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
    onTimelineItemChange?: (item: Item) => void;
}

/**
 * Component
 * @param props
 */
export const Timeline = memo(
    ({
        sections,
        activeSectionId = "",
        activeItemId = "",
        onTimelineItemChange = (): null => null,
        ...props
    }: Props): JSX.Element => {
        const wrapperRef = useRef() as RefObject<HTMLDivElement>;
        const sectionTitleRef = useRef() as RefObject<HTMLDivElement>;
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

        const { height: wrapperHeight } = useElementSize(wrapperRef);
        const { height: sectionTitleHeight } = useElementSize(sectionTitleRef);

        const activeListHeight = (wrapperHeight - sectionTitleHeight * sections.length);
        const contentListHeight = activeListHeight > 0 ? (activeListHeight - 50) : 0;

        const [state, setState] = useState({
            sectionId: activeSectionId || activeSections[0]?.id || "",
            activeId: activeItemId || allItems[0]?.id || "",
        });

        const onTimelineItemClick = useCallback(
            (item: Item) => {
                if (state.activeId === item.id) {
                    return;
                }

                setState({
                    ...state,
                    activeId: item.id,
                });

                onTimelineItemChange(item);
            },
            [onTimelineItemChange, state]
        );

        const onTimelineHeaderClick = useCallback(
            (section: Section): void => {
                if (state.sectionId === section.id) {
                    return;
                }

                const newState = {
                    ...state,
                    sectionId: section.id,
                };

                if (section.items && section.items.length > 0) {
                    newState.activeId = section.items[0].id || "";
                }

                setState(newState);
            },
            [state]
        );

        return (
            <TimelineWrapper ref={wrapperRef} {...props}>
                {sections.map((section: Section, index: number) => (
                    <AnimatePresence key={`timeline-${index}`} initial={false}>
                        <Title
                            isActive={section.id === state.sectionId}
                            hasMultipleSections={sections.length > 1}
                            initial={false}
                            ref={sectionTitleRef}
                            onClick={onTimelineHeaderClick.bind(null, section)}
                            key={`timeline-${index}-title`}
                        >
                            {section.title}
                        </Title>
                        <List
                            animate="open"
                            initial="collapsed"
                            exit="collapsed"
                            key={`timeline-${index}-list`}
                            variants={{
                                open: {
                                    opacity: 1,
                                    height:
                                        section.id === state.sectionId
                                            ? contentListHeight
                                            : 0,
                                },
                                collapsed: { opacity: 0, height: 0 },
                            }}
                            transition={{
                                duration: 0.8,
                                ease: [0.04, 0.62, 0.23, 0.98],
                            }}
                        >
                            <Pin
                                animate={{
                                    y: Math.max(0, ((contentListHeight /
                                        (section.items?.length ?? 1)) *
                                        (section.items?.findIndex(
                                            (item) => item.id === state.activeId
                                        ) || 0))),
                                }}
                                style={{
                                    height:
                                        Math.max(0, contentListHeight /
                                            (section.items?.length ?? 1)),
                                }}
                            />
                            {section.items?.map((item: Item, itemIndex: number) => (
                                <ListItem
                                    key={itemIndex}
                                    isActive={
                                        section.id === state.sectionId &&
                                        item.id === state.activeId
                                    }
                                    onClick={onTimelineItemClick.bind(
                                        null,
                                        item
                                    )}
                                >
                                    {item.name}
                                </ListItem>
                            ))}
                        </List>
                    </AnimatePresence>
                ))}
            </TimelineWrapper>
        );
    },
    (prevProps, nextProps) => prevProps.sections.length === nextProps.sections.length
);
