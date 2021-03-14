import React, { Fragment, useState, RefObject, useRef } from "react";
import tw, { css, styled } from "twin.macro";
import { motion, MotionProps, AnimateSharedLayout } from "@components/animation";
import { useElementSize } from "@hooks/element-size";

/**
 * Style
 */
const TimelineWrapper = styled.div(() => [tw`flex flex-col text-right z-50`]);

const Title = styled(motion.header)(({ isActive }: TitleStyle) => [
    tw`lg:prose-20px lg:text-primary-color opacity-30 font-bold`,
    isActive && tw`opacity-100 lg:p-1`,
]);

const List = styled(motion.section)(() => [
    tw`font-bold lg:prose-14px lg:text-gray-500 w-auto flex-grow relative overflow-hidden`,
    css`
        transition: opacity 0.3s ease-in-out;
    `,
]);

const ListItem = styled(motion.div)(({ isActive }: ListItemStyle) => [
    tw`lg:text-primary-color opacity-20 lg:p-5 border-r border-primary-color relative select-none cursor-pointer`,
    isActive && tw`opacity-100 border-r-0`,
]);

const Pin = styled(motion.div)(({ isActive }: PinStyle) => [
    tw`hidden`,
    isActive && tw`block`,
    css`
        width: 2px;
        z-index: 2;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
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

interface PinStyle extends MotionProps {
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
export function Timeline({
    sections,
    onTimelineItemChange = (): null => null,
}: Props): JSX.Element {
    const listItemActiveRef = useRef() as RefObject<HTMLDivElement>;
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

    const { height } = useElementSize(listItemActiveRef);

    const [state, setState] = useState({
        sectionId: activeSections[0].id,
        activeId: allItems[0].id,
    });

    return (
        <TimelineWrapper>
            {sections.map((section: Section, index: number) => (
                <Fragment key={index}>
                    <Title isActive={section.id === state.sectionId}
                        initial={false}
                        onClick={(): void => {
                            const newState = {
                                ...state,
                                sectionId: section.id,
                            };

                            if (section.items && section.items.length > 0) {
                                newState.activeId = section.items[0].id || "";
                            }

                            setState(newState);
                        }}
                    >
                        {section.title}
                    </Title>
                    <AnimateSharedLayout>
                        <List
                            layout
                            key="content"
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={{
                                open: { opacity: 1, height: section.id === state.sectionId ? height * (section.items?.length || 0) : 0 },
                                collapsed: { opacity: 0, height: 0 }
                            }}
                            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
                        >
                            <Pin
                                isActive={Boolean(
                                    section.id === state.sectionId &&
                                    section.items?.length
                                )}
                                animate={{
                                    y:
                                        height *
                                        (section.items?.findIndex(
                                            (item) => item.id === state.activeId
                                        ) || 0),
                                }}
                                style={{
                                    height,
                                }}
                            />
                            {section.items?.map((item: Item, itemIndex: number) => (
                                <ListItem
                                    key={itemIndex}
                                    isActive={section.id === state.sectionId && item.id === state.activeId}
                                    onClick={(): void => {
                                        setState({
                                            ...state,
                                            activeId: item.id,
                                        });

                                        onTimelineItemChange.bind(null, item);
                                    }}
                                    {...(section.id === state.sectionId && item.id === state.activeId
                                        ? {
                                            ref: listItemActiveRef,
                                        }
                                        : {})}
                                >
                                    {item.name}
                                </ListItem>
                            ))}
                        </List>
                    </AnimateSharedLayout>
                </Fragment>
            ))}
        </TimelineWrapper>
    );
}
