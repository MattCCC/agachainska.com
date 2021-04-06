import {
    useContext,
    useCallback,
    ReactNode,
    FunctionComponent,
    useRef,
} from "react";

import { motion, PanInfo, Spring, useAnimation } from "framer-motion";
import useDimensions from "react-use-dimensions";
import { css, styled } from "twin.macro";

import { MotionProps } from "@components/animation";
import { useWindowSize } from "@hooks/use-window-size";

import { Context } from "./context";
import { ActionTypes } from "./reducers";

interface Props extends MotionProps {
    children: ReactNode;
    padding?: number;
    gap: number;
    velocity: number;
    transition: Spring;
    allowSlideToLast?: boolean;
}

const TrackWrapper = styled(motion.div)(
    ({ padding }: { padding: number | undefined }) => [
        css`
            display: flex;
            flex-wrap: nowrap;
            min-width: min-content;
            padding: ${padding || 10}px;
            cursor: grab;

            &:active {
                cursor: grabbing;
            }
        `,
    ]
);

export const Track: FunctionComponent<Props> = ({
    children,
    padding,
    gap,
    velocity,
    transition,
    allowSlideToLast,
    style,
}: Props) => {
    const ref = useRef<HTMLElement | null>(null);
    const [trackRef, trackDimensions] = useDimensions({ liveMeasure: true });
    const windowDimensions = useWindowSize();
    const controls = useAnimation();
    const { state, dispatch } = useContext(Context);

    const itemsPositions = state.items.map(
        (item) => item * -1 + trackDimensions.x || 0
    );

    const lastTwo = state.items.slice(-2);
    const lastItem = lastTwo[1] - lastTwo[0];

    const onDragEnd = useCallback(
        (_event, info: PanInfo) => {
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
                type: ActionTypes.SetActive,
                payload: { activeItem: activeSlide },
            });

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
            ref,
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
        <TrackWrapper
            ref={(el) => {
                trackRef(el);
                ref.current = el;
            }}
            style={style}
            padding={padding}
            animate={controls}
            drag="x"
            dragConstraints={{
                left: allowSlideToLast
                    ? lastItem + gap - trackDimensions.width
                    : windowDimensions.width -
                      trackDimensions.width -
                      trackDimensions.x * 2,
                right: 0,
            }}
            onDragEnd={onDragEnd}
        >
            {children}
        </TrackWrapper>
    );
};
