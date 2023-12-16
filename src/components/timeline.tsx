import {
    useState,
    useEffect,
    RefObject,
    useRef,
    useCallback,
    memo,
    HTMLAttributes,
    useMemo,
    CSSProperties,
} from "react";

import tw, { css, styled } from "twin.macro";

import { useElementSize } from "hooks/use-element-size";
import { excludeProps } from "utils/styled";

const TimelineWrapper = styled.div(() => [tw`relative text-right z-100`]);

const Title = styled.div.withConfig(
    excludeProps(["hasMultipleSections", "isActive"])
)(({ isActive, hasMultipleSections }: TitleStyle) => [
    tw`font-bold select-none lg:text-[20px] lg:leading-7 lg:text-primary opacity-30`,
    tw`transition-opacity hover:opacity-100`,
    css`
        padding-bottom: 7px;
        height: 33px;
    `,
    isActive && tw`opacity-100`,
    hasMultipleSections && tw`cursor-pointer`,
]);

const TimelineList = styled.div(() => [
    tw`relative flex flex-col items-end w-auto overflow-hidden font-bold lg:text-[14px] lg:leading-2 lg:text-gray-500 justify-evenly opacity-0 h-0`,
    css`
        box-shadow: inset -2px 0 0 -1px rgba(0, 0, 0, 0.2);
        transition:
            opacity 0.3s cubic-bezier(0.04, 0.62, 0.23, 0.98),
            height 0.3s cubic-bezier(0.04, 0.62, 0.23, 0.98);
    `,
]);

const ListItem = styled.div(() => [
    tw`relative items-center h-full ml-auto align-middle`,
    tw`flex text-right capitalize cursor-pointer select-none lg:text-primary lg:p-5`,
    tw`transition-opacity hover:opacity-100`,
]);

const Pin = styled.div(() => [
    tw`absolute top-0 bottom-0 right-0 w-px bg-primary z-[2] transition-transform transform-gpu`,
]);

interface TitleStyle {
    isActive?: boolean;
    hasMultipleSections?: boolean;
}

export interface TimelineItem {
    title: string;
    id: string;
}

export interface TimelineSection {
    title: string;
    id: string;
    items?: TimelineItem[];
}

interface Props extends HTMLAttributes<HTMLElement> {
    sections: TimelineSection[];
    activeSectionId?: string;
    activeItemId?: string;
    onTimelineItemChange?: (item?: TimelineItem) => void;
    style?: CSSProperties;
}

const Timeline = memo(
    ({
        sections,
        activeSectionId = "",
        activeItemId = "",
        onTimelineItemChange = (): null => null,
        style = undefined,
    }: Props) => {
        const wrapperRef = useRef() as RefObject<HTMLDivElement>;
        const timelineListRef = useRef() as RefObject<HTMLDivElement>;
        const sectionTitleRef = useRef() as RefObject<HTMLDivElement>;

        const { height: wrapperHeight } = useElementSize(wrapperRef);
        const { height: sectionTitleHeight } = useElementSize(sectionTitleRef);

        const activeListHeight =
            wrapperHeight - sectionTitleHeight * sections.length;
        const contentListHeight =
            activeListHeight > 0 ? activeListHeight - 50 : 0;

        const availableSections: TimelineSection[] = useMemo(
            () =>
                sections.filter(
                    (section) => section?.items && section?.items?.length > 0
                ),
            [sections]
        );

        const allItems = useMemo(
            () =>
                availableSections.reduce(
                    (items: TimelineItem[], currentValue: TimelineSection) => {
                        items = [...items, ...(currentValue.items || [])];

                        return items;
                    },
                    []
                ),
            [availableSections]
        );

        const [state, setState] = useState({
            activeSectionId: activeSectionId || availableSections[0]?.id || "",
            activeItemId: activeItemId || allItems[0]?.id || "",
            disabledTransitionClass: "",
        });

        useEffect(() => {
            setTimeout(() => {
                timelineListRef?.current?.classList.remove("!transition-none");
            }, 60);
        }, []);

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
            (item: TimelineItem) => {
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
            (section: TimelineSection): void => {
                if (state.activeSectionId === section.id) {
                    return;
                }

                const newState = {
                    ...state,
                    sectionId: section.id,
                };

                if (section.items?.length) {
                    newState.activeItemId = section.items[0]?.id || "";

                    onTimelineItemChange(section.items[0]);
                }

                setState(newState);
            },
            [state, onTimelineItemChange]
        );

        return (
            <TimelineWrapper ref={wrapperRef} style={style}>
                {sections.map((section: TimelineSection) => (
                    <div key={`timeline-${section.id}`}>
                        <Title
                            isActive={section.id === state.activeSectionId}
                            hasMultipleSections={sections.length > 1}
                            ref={sectionTitleRef}
                            onClick={onTimelineHeaderClick.bind(null, section)}
                            key={`timeline-${section.id}-title`}
                        >
                            {section.title}
                        </Title>

                        <TimelineList
                            ref={timelineListRef}
                            key={`timeline-${section.id}-list`}
                            style={{
                                opacity:
                                    section.id === state.activeSectionId
                                        ? 1
                                        : 0,
                                height:
                                    section.id === state.activeSectionId
                                        ? contentListHeight
                                        : 0,
                            }}
                            className="!transition-none"
                        >
                            <Pin
                                style={
                                    {
                                        "--tw-translate-y":
                                            Math.max(
                                                0,
                                                (contentListHeight /
                                                    (section.items?.length ??
                                                        1)) *
                                                    (section.items?.findIndex(
                                                        (item) =>
                                                            item.id ===
                                                            state.activeItemId
                                                    ) ?? 0)
                                            ) + "px",
                                        height: Math.max(
                                            0,
                                            contentListHeight /
                                                (section.items?.length ?? 1)
                                        ),
                                    } as React.CSSProperties
                                }
                            />

                            {section.items?.map((item: TimelineItem) => (
                                <ListItem
                                    key={`${section.id}-${item.id}`}
                                    className={
                                        "opacity-30" +
                                        (section.id === state.activeSectionId &&
                                        item.id === state.activeItemId
                                            ? "opacity-100"
                                            : "")
                                    }
                                    onClick={() => onTimelineItemClick(item)}
                                >
                                    {item.title}
                                </ListItem>
                            ))}
                        </TimelineList>
                    </div>
                ))}
            </TimelineWrapper>
        );
    },
    (prevProps, nextProps) =>
        prevProps.sections.length === nextProps.sections.length &&
        prevProps.activeSectionId === nextProps.activeSectionId &&
        prevProps.activeItemId === nextProps.activeItemId
);

export default Timeline;
