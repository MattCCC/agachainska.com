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
import { useElementSize } from "@hooks/use-element-size";

const TimelineWrapper = styled.div(() => [tw`text-right w-52 z-10`]);

const Title = styled(motion.div)(
    ({ isActive, hasMultipleSections }: TitleStyle) => [
        tw`lg:prose-20px lg:text-primary-color opacity-30 font-bold select-none`,
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
    tw`absolute right-0 top-0 bottom-0 w-px bg-primary-color`,
    css`
        z-index: 2;
    `,
]);

interface TitleStyle extends MotionProps {
    isActive?: boolean;
    hasMultipleSections?: boolean;
}

interface ListItemStyle extends MotionProps {
    isActive?: boolean;
}

export interface Item {
    [x: string]: any;
    name: string;
    id: string;
}

export interface Section {
    [x: string]: any;
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
        const availableSections: Section[] = sections.filter(
            (section) => section?.items && section?.items?.length > 0
        );
        const allItems = availableSections.reduce(
            (items: Item[], currentValue: Section) => {
                items = [...items, ...(currentValue.items || [])];

                return items;
            },
            []
        );

        const { height: wrapperHeight } = useElementSize(wrapperRef);
        const { height: sectionTitleHeight } = useElementSize(sectionTitleRef);

        const activeListHeight =
            wrapperHeight - sectionTitleHeight * sections.length;
        const contentListHeight =
            activeListHeight > 0 ? activeListHeight - 50 : 0;

        const [state, setState] = useState({
            activeSectionId: activeSectionId || availableSections[0]?.id || "",
            activeItemId: activeItemId || allItems[0]?.id || "",
        });

        useEffect(() => {
            setState((prevState) => {
                if (
                    activeSectionId === prevState.activeSectionId &&
                    activeItemId === prevState.activeItemId
                ) {
                    return prevState;
                }

                return {
                    ...prevState,
                    activeSectionId:
                        activeSectionId !== prevState.activeSectionId
                            ? activeSectionId
                            : prevState.activeSectionId,
                    activeItemId:
                        activeItemId !== prevState.activeItemId
                            ? activeItemId
                            : prevState.activeItemId,
                };
            });
        }, [activeItemId, activeSectionId, state]);

        const onTimelineItemClick = useCallback(
            (item: Item) => {
                if (state.activeItemId === item.id) {
                    return;
                }

                setState((prevState) => ({
                    ...prevState,
                    activeItemId: item.id,
                }));

                onTimelineItemChange(item);
            },
            [onTimelineItemChange, state]
        );

        const onTimelineHeaderClick = useCallback(
            (section: Section): void => {
                if (state.activeSectionId === section.id) {
                    return;
                }

                const newState = {
                    ...state,
                    sectionId: section.id,
                };

                if (section.items?.length) {
                    newState.activeItemId = section.items[0].id || "";

                    onTimelineItemChange(section.items[0]);
                }

                setState(newState);
            },
            [state, onTimelineItemChange]
        );

        return (
            <TimelineWrapper ref={wrapperRef} {...props}>
                {sections.map((section: Section, index: number) => (
                    <AnimatePresence key={`timeline-${index}`} initial={false}>
                        <Title
                            isActive={section.id === state.activeSectionId}
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
                                        section.id === state.activeSectionId
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
                                    y: Math.max(
                                        0,
                                        (contentListHeight /
                                            (section.items?.length ?? 1)) *
                                            (section.items?.findIndex(
                                                (item) =>
                                                    item.id ===
                                                    state.activeItemId
                                            ) || 0)
                                    ),
                                }}
                                style={{
                                    height: Math.max(
                                        0,
                                        contentListHeight /
                                            (section.items?.length ?? 1)
                                    ),
                                }}
                            />
                            {section.items?.map(
                                (item: Item, itemIndex: number) => (
                                    <ListItem
                                        key={itemIndex}
                                        isActive={
                                            section.id ===
                                                state.activeSectionId &&
                                            item.id === state.activeItemId
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
    },
    (prevProps, nextProps) =>
        prevProps.sections.length === nextProps.sections.length &&
        prevProps.activeSectionId === nextProps.activeSectionId &&
        prevProps.activeItemId === nextProps.activeItemId
);
