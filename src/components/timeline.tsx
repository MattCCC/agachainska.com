import { useState, RefObject, useRef, useCallback, memo } from "react";
import tw, { css, styled } from "twin.macro";
import { motion, MotionProps, AnimatePresence } from "@components/animation";
import { useElementSize } from "@hooks/element-size";

/**
 * Style
 */
const TimelineWrapper = styled.div(() => [
    tw`text-right w-52 z-10 m-auto flex flex-col justify-center col-start-5 row-start-1 row-end-5 row-span-5`,
    css`
        height: 27.76rem;
    `
]);

const Title = styled(motion.div)(({ isActive }: TitleStyle) => [
    tw`lg:prose-20px lg:text-primary-color opacity-30 font-bold cursor-pointer`,
    isActive && tw`opacity-100 lg:p-1`,
]);

const List = styled(motion.div)(() => [
    tw`font-bold lg:prose-14px lg:text-gray-500 w-auto flex flex-col justify-evenly relative overflow-hidden`,
    css`
        transition: opacity 0.3s ease-in-out;
    `,
]);

const ListItem = styled(motion.div)(({ isActive }: ListItemStyle) => [
    tw`lg:text-primary-color opacity-20 border-r lg:p-5 h-full border-primary-color align-middle flex text-right ml-auto items-center relative select-none cursor-pointer`,
    isActive && tw`opacity-100 border-r-0`,
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
}

interface ListItemStyle extends MotionProps {
    isActive?: boolean;
}

export interface Item {
    name: string;
    id: string;
}

export interface Section {
    title: string;
    id: string;
    items?: Item[];
}

interface Props {
    onTimelineItemChange: (item: Item) => void;
    sections: Section[];
}

/**
 * Component
 * @param props
 */
export const Timeline = memo(
    ({
        sections,
        onTimelineItemChange = (): null => null,
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

        const contentListMinHeight = (wrapperHeight - (sectionTitleHeight * sections.length)) - 50;

        const [state, setState] = useState({
            sectionId: activeSections[0].id,
            activeId: allItems[0].id,
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
            <TimelineWrapper ref={wrapperRef}>
                {sections.map((section: Section, index: number) => (
                    <AnimatePresence key={`timeline-${index}`} initial={false}>
                        <Title isActive={section.id === state.sectionId}
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
                                            ? contentListMinHeight
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
                                    y:
                                        (contentListMinHeight / (section.items?.length ?? 1)) *
                                        (section.items?.findIndex(
                                            (item) => item.id === state.activeId
                                        ) || 0),
                                }}
                                style={{
                                    height: (contentListMinHeight / (section.items?.length ?? 1))
                                }}
                            />
                            {section.items?.map(
                                (item: Item, itemIndex: number) => (
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
                                )
                            )}
                        </List>
                    </AnimatePresence>
                ))}
            </TimelineWrapper>
        );
    }
);
