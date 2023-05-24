import {
    useContext,
    useCallback,
    useRef,
    PropsWithChildren,
    useMemo,
} from "react";

import { motion, PanInfo, Spring, useAnimation } from "framer-motion";
import useMeasure from "react-use-measure";
import tw, { styled } from "twin.macro";

import { MotionProps } from "components/animation";
import { useWindowSize } from "hooks/use-window-size";
import { excludeProps } from "utils/styled";

import { Context } from "./context";
import { ActionTypes } from "./reducers";

interface Props extends MotionProps {
    padding?: number;
    gap: number;
    velocity: number;
    transition: Spring;
    allowSlideToLast?: boolean;
    displayGrabCursor?: boolean;
    onSlideChange?: (activeSlide: number) => unknown;
}

interface TrackWrapperProps {
    padding?: number;
    displayGrabCursor?: boolean;
}

const Wrapper = styled("div").withConfig(excludeProps(["displayGrabCursor"]))(
    ({ displayGrabCursor }: TrackWrapperProps) => [
        displayGrabCursor && tw`cursor-grab active:cursor-grabbing`,
    ]
);

export const Track = ({
    children,
    padding,
    gap,
    velocity,
    transition,
    allowSlideToLast,
    displayGrabCursor = false,
    onSlideChange = () => null,
    style,
}: PropsWithChildren<Props>) => {
    const ref = useRef<HTMLElement | null>(null);
    const [trackRef, trackDimensions] = useMeasure();
    const windowDimensions = useWindowSize();
    const controls = useAnimation();
    const { state, dispatch } = useContext(Context);

    const itemsPositions = useMemo(
        () =>
            state.items.map(
                (position) => position * -1 + trackDimensions.x || 0
            ),
        [state.items, trackDimensions.x]
    );

    const left = useMemo(() => {
        const lastTwoItems = state.items.slice(-2);

        const lastItem =
            typeof lastTwoItems[0] !== "undefined" &&
            typeof lastTwoItems[1] !== "undefined"
                ? lastTwoItems[1] - lastTwoItems[0]
                : 0;

        return allowSlideToLast
            ? lastItem + gap - trackDimensions.width
            : windowDimensions.width -
                  trackDimensions.width -
                  trackDimensions.x * 2;
    }, [
        allowSlideToLast,
        gap,
        state.items,
        trackDimensions.width,
        trackDimensions.x,
        windowDimensions.width,
    ]);

    const onDragEnd = useCallback(
        (_event: Event, info: PanInfo) => {
            const correctedVelocity = info.velocity.x * velocity;
            const direction =
                correctedVelocity < 0 || info.offset.x < 0 ? 1 : -1;
            const offset = info.offset.x;
            const itemOuterWidth = trackDimensions.x + gap;

            const panX = ref?.current?.getBoundingClientRect().x || 0;
            const startPosition =
                panX - (direction === -1 ? itemOuterWidth : 0);

            const endOffset =
                direction === 1
                    ? Math.min(correctedVelocity, offset)
                    : Math.max(correctedVelocity, offset);
            const endPosition = startPosition + endOffset;

            const closestPosition = itemsPositions.reduce(
                (prev: number, curr: number) =>
                    Math.abs(curr - endPosition) < Math.abs(prev - endPosition)
                        ? curr
                        : prev
            );

            const activeSlide = itemsPositions.indexOf(closestPosition);

            dispatch({
                type: ActionTypes.SetActiveItem,
                payload: { activeItem: activeSlide },
            });

            onSlideChange(activeSlide);

            controls.start({
                x: allowSlideToLast
                    ? closestPosition
                    : Math.max(
                          closestPosition,
                          windowDimensions.width -
                              trackDimensions.width -
                              trackDimensions.x * 2
                      ),
                transition: {
                    type: "spring",
                    velocity: info.velocity.x,
                    stiffness: transition.stiffness,
                    damping: transition.damping,
                    mass: transition.mass,
                },
            });
        },
        [
            allowSlideToLast,
            controls,
            dispatch,
            gap,
            itemsPositions,
            onSlideChange,
            trackDimensions.width,
            trackDimensions.x,
            transition.damping,
            transition.mass,
            transition.stiffness,
            velocity,
            windowDimensions.width,
        ]
    );

    return (
        <Wrapper displayGrabCursor={displayGrabCursor}>
            <motion.div
                style={{
                    padding,
                    ...style,
                    ...{
                        display: "flex",
                        flexWrap: "nowrap",
                        minWidth: "min-content",
                    },
                }}
                ref={(el) => {
                    trackRef(el);
                    ref.current = el;
                }}
                animate={controls}
                drag="x"
                dragConstraints={{
                    left,
                    right: 0,
                }}
                onDragEnd={onDragEnd}
            >
                {children}
            </motion.div>
        </Wrapper>
    );
};
