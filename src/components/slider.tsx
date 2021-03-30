import {
    useState,
    useEffect,
    Fragment,
    useCallback,
    useRef,
    ElementRef,
    RefObject,
} from "react";

import tw, { css, styled } from "twin.macro";

import { animate, AnimatePresence, motion } from "@components/animation";
import { Distortion } from "@components/distortion";
import { MainTitleTop } from "@components/main-title";
import { useEventListener } from "@hooks/use-event-listener";
import { ReactComponent as NextIcon } from "@svg/down.svg";
import { ReactComponent as PrevIcon } from "@svg/up.svg";

const duration = 1;
const height = 445;
const initialSlideScale = 0.25;

const variants = {
    enter: (direction: number): Record<string, any> => ({
        zIndex: 1,
        top:
            direction > 0
                ? height + height * initialSlideScale
                : -height - height * initialSlideScale,
    }),
    center: {
        top: 0,
        zIndex: 1,
        transition: {
            duration,
        },
    },
    exit: (direction: number): Record<string, any> => ({
        zIndex: 0,
        top: direction < 0 ? height : -height,
        opacity: 1,
        transition: {
            duration,
        },
    }),
};

const sliderTransition = {
    top: {
        type: "spring",
        stiffness: 100,
        damping: 15,
    },
    opacity: { duration },
};

const sliderDragConstraints = { top: 0, bottom: 0 };

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 5;

export const swipePower = (offset: number, velocity: number): number =>
    Math.abs(offset) * velocity;

export const powerEasing = (power: number = 2) => (p: number): number =>
    p < 0.5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;

export const wrap = (min: number, max: number, v: number): number => {
    const rangeSize = max - min;

    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

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

const Title = styled(MainTitleTop)(() => [
    tw`absolute uppercase z-50 select-none`,
    css`
        width: 55%;
        top: -5.35rem;
        line-height: 130px;
    `,
]);

const SlidesList = styled(motion.div)(() => [
    tw`absolute w-full max-w-full`,
    css`
        height: 27.76rem;
    `,
]);

const Slide = styled(motion(Distortion, { forwardMotionProps: true }))(() => [
    tw`relative w-full h-full z-10 cursor-pointer`,
    css`
        transition: transform 0.8s;
        transform: scale(${initialSlideScale + 1});

        &:hover {
            transform: scale(1.05);
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

export interface SliderItem {
    name: string;
    cover: string;
    id: string;
    routeTo: string;
    category: string;
}

interface Props {
    sliderItems: SliderItem[];
    slideId: number;
    onSliderTap: (e: any, currentItem: SliderItem) => void;
    onSliderChange: (currentItem: SliderItem) => void;
}

type SliderRefHandle = ElementRef<typeof Slider>;

/**
 * Component
 */
export function Slider({
    sliderItems,
    slideId = -1,
    onSliderTap,
    onSliderChange,
}: Props): JSX.Element {
    const [[page, direction], setPage] = useState([0, 0]);
    const [isAnimating, setIsAnimating] = useState(false);

    const sliderRef = useRef<SliderRefHandle>(
        null
    ) as RefObject<HTMLDivElement>;

    // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
    // then wrap that within 0-2 to find our image ID in the array below. By passing an
    // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
    // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
    const sliderIndex = wrap(0, sliderItems.length, page);

    const [scales, setScales] = useState({} as Record<string, number>);

    if (typeof scales[page] === "undefined") {
        setScales((prevState) => ({
            ...prevState,
            ...{ [page]: 0 },
        }));
    }

    // Orchestrate distorsion animation
    const orchestrateVectorAnimation = useCallback(
        (from = 0, to = 100, slideNo = 0) => {
            requestAnimationFrame(() => {
                animate(from, to, {
                    duration: duration / 2,
                    ease: powerEasing(2),
                    onUpdate: (v) => {
                        // Access element that is about to be removed from the DOM
                        // This way we avoid 1 rendering roundtrip
                        const el = document?.querySelector("feDisplacementMap");

                        if (el) {
                            el.scale.baseVal = v;
                        }

                        setScales((prevState) => ({
                            ...prevState,
                            ...{ [slideNo]: v },
                        }));
                    },
                    onComplete: () => {
                        // Avoid infinite loop since we call the orchestration recursively
                        if (!to) {
                            return;
                        }

                        orchestrateVectorAnimation(100, 0, slideNo);
                    },
                });
            });
        },
        [setScales]
    );

    const goTo = useCallback(
        (newDirection: number = -1): void => {
            if (isAnimating) {
                return;
            }

            const newStateDirection = page + newDirection;

            setIsAnimating(true);
            setPage([newStateDirection, newDirection]);
            orchestrateVectorAnimation(0, 100, newStateDirection);

            const currentSliderItem = wrap(
                0,
                sliderItems.length,
                newStateDirection
            );

            onSliderChange(sliderItems[currentSliderItem]);
        },
        [
            isAnimating,
            page,
            orchestrateVectorAnimation,
            sliderItems,
            onSliderChange,
        ]
    );

    const onDragEnd = useCallback(
        (_e, { offset, velocity }): void => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
                goTo(-1);
            } else if (swipe > swipeConfidenceThreshold) {
                goTo(1);
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

    useEffect(() => {
        if (slideId === -1 || page === slideId) {
            return;
        }

        setIsAnimating(true);
        setPage([slideId, sliderIndex > 0 ? 1 : -1]);
        orchestrateVectorAnimation(0, 100, slideId);
    }, [
        sliderItems,
        sliderIndex,
        slideId,
        page,
        goTo,
        orchestrateVectorAnimation,
    ]);

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
                <Title percentage={86} baseFontSize={120} smBaseFontSize={120} data-text={sliderItems[sliderIndex].name}>
                    {sliderItems[sliderIndex].name}
                </Title>
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
                            transition={sliderTransition}
                            dragPropagation={true}
                            drag="y"
                            dragConstraints={sliderDragConstraints}
                            dragElastic={1}
                            onDragEnd={onDragEnd}
                            onClick={(e): void =>
                                onSliderTap(e, sliderItems[sliderIndex])
                            }
                        >
                            <Slide
                                id={String(page)}
                                imgUrl={sliderItems[sliderIndex]?.cover || ""}
                                key={`slide-${page}`}
                                scale={scales[page]}
                            ></Slide>
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
