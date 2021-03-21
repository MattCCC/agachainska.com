import { useState, Fragment, useCallback, useRef, ElementRef } from "react";
import tw, { css, styled } from "twin.macro";
import { motion } from "@components/animation";
import { ReactComponent as PrevIcon } from "@svg/up.svg";
import { ReactComponent as NextIcon } from "@svg/down.svg";
import { useEventListener } from "@hooks/event-listener";
import { AnimatePresence } from "framer-motion";

const duration = 0.8;
const height = 445;

const variants = {
    enter: (direction: number) => ({
        zIndex: 1,
        top: direction > 0 ? height : -height,
    }),
    center: {
        top: 0,
        zIndex: 1,
        transition: {
            duration,
        },
    },
    exit: (direction: number) => ({
        zIndex: 0,
        top: direction < 0 ? height : -height,
        opacity: 1,
        transition: {
            duration,
        },
    }),
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 5;

const swipePower = (offset: number, velocity: number): number =>
    Math.abs(offset) * velocity;

/**
 * Style
 */
const SliderWrapper = styled.div(() => [tw`relative`]);

const SlideContent = styled.div(() => [
    tw`overflow-hidden relative`,
    css`
        height: 27.76rem;
    `,
]);

const Title = styled.h1(() => [
    tw`absolute w-1/2 lg:prose-120px uppercase z-50 select-none`,
    css`
        top: -5.35rem;
        color: var(--black-color);
        background: linear-gradient(
            180deg,
            var(--black-color) 33%,
            transparent 32%
        );
        background-clip: text;
        -webkit-text-fill-color: transparent;

        ::before {
            position: absolute;
            left: 0;
            bottom: 0;
            content: attr(data-text);
            color: transparent;
            clip-path: circle(500px at 100px 100px);
            -webkit-text-stroke-width: 2px;
            -webkit-text-stroke-color: rgba(0, 0, 0, 0.8);
            background-color: transparent;
            color: transparent;
        }
    `,
]);

const SlidesList = styled(motion.div)(() => [tw`absolute w-auto`]);

const SlideImg = styled.img(() => [
    tw`relative w-full h-full z-10`,
    css`
        pointer-events: none;
        transition: transform 0.8s;

        &:hover {
            transform: scale(1.03, 1.03);
        }
    `,
]);

const Controls = styled.div(() => [
    tw`relative pt-12 flex justify-items-center`,
]);

const Btn = styled.div(() => [
    tw`lg:prose-16px w-28 flex-row select-none cursor-pointer`,
]);

const PrevIconStyled = styled(PrevIcon)(() => [
    tw`inline-block text-center mr-4`,
]);

const NextIconStyled = styled(NextIcon)(() => [
    tw`inline-block text-center mr-4`,
]);

/**
 * Interfaxces
 */

interface Props {
    images: string[];
}

type SliderRefHandle = ElementRef<typeof Slider>;

export const wrap = (min: number, max: number, v: number): number => {
    const rangeSize = max - min;

    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

/**
 * Component
 * @param props
 */
export function Slider({ images }: Props): JSX.Element {
    const [[page, direction], setPage] = useState([0, 0]);
    const [isAnimating, setIsAnimating] = useState(false);
    const sliderRef = useRef<SliderRefHandle>(null);

    // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
    // then wrap that within 0-2 to find our image ID in the array below. By passing an
    // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
    // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
    const imageIndex = wrap(0, images.length, page);

    const goTo = useCallback(
        (newDirection: number = -1): void => {
            if (isAnimating) {
                return;
            }

            setIsAnimating(true);
            setPage([page + newDirection, newDirection]);
        },
        [isAnimating, page, setIsAnimating]
    );

    const onDragEnd = useCallback(
        (e, { offset, velocity }): void => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
                goTo(1);
            } else if (swipe > swipeConfidenceThreshold) {
                goTo(-1);
            }
        },
        [goTo]
    );

    const updateScroll = useCallback(
        (e: WheelEvent): void => {
            const isUp = e.deltaY && e.deltaY < 0;

            if (isUp) {
                goTo(1);
            } else {
                goTo(-1);
            }
        },
        [goTo]
    );

    useEventListener(
        "wheel",
        (e) => {
            e.preventDefault();

            return updateScroll(e as WheelEvent);
        },
        sliderRef
    );

    return (
        <Fragment>
            <SliderWrapper ref={sliderRef}>
                <Title data-text={"Danish Bakery"}>Danish Bakery</Title>
                <SlideContent>
                    <AnimatePresence
                        initial={false}
                        custom={direction}
                        onExitComplete={(): void => setIsAnimating(false)}
                    >
                        <SlidesList
                            key={page}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                top: {
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 15,
                                },
                                opacity: { duration },
                            }}
                            dragPropagation={true}
                            drag="y"
                            dragConstraints={{ top: 0, bottom: 0 }}
                            dragElastic={1}
                            onDragEnd={onDragEnd}
                        >
                            <SlideImg src={images[imageIndex]} />
                        </SlidesList>
                    </AnimatePresence>
                </SlideContent>
                <Controls>
                    <Btn onClick={(): void => goTo(1)}>
                        <NextIconStyled /> Next
                    </Btn>
                    <Btn onClick={(): void => goTo(-1)}>
                        <PrevIconStyled /> Previous
                    </Btn>
                </Controls>
            </SliderWrapper>
        </Fragment>
    );
}
