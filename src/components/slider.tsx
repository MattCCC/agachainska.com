import {
    useState,
    useEffect,
    useCallback,
    useRef,
    ElementRef,
    RefObject,
    FunctionComponent,
    SetStateAction,
} from "react";

import tw, { css, styled } from "twin.macro";
import useMouseLeave from "use-mouse-leave";

import { animate, AnimatePresence, motion } from "@components/animation";
import { Distortion } from "@components/distortion";
import { MainTitleTop } from "@components/main-title";
import { ReactComponent as NextIcon } from "@svg/down.svg";
import { ReactComponent as PrevIcon } from "@svg/up.svg";

export interface SliderItem {
    [x: string]: any;
    name: string;
    cover: string;
    id: string;
}

interface Props {
    sliderItems: SliderItem[];
    slideId: number;
    page: number;
    direction: number;
    goTo: (newDirection: number) => void;
    setIsAnimating: (newValue: boolean) => void;
    setPage: (newValue: SetStateAction<[number, number]>) => void;
    onSliderTap?: (e: any, currentItem: SliderItem) => void;
    onSliderChange?: (currentItem: SliderItem) => void;
    onSliderMouseEnter?: (mouseLeft: boolean) => void;
    onSliderMouseLeave?: (mouseLeft: boolean) => void;
}

type SliderRefHandle = ElementRef<typeof Slider>;

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

// The less distance a user has swiped, the more velocity they need to register as a swipe
const swipeConfidenceThreshold = 5;

export const swipePower = (offset: number, velocity: number): number =>
    Math.abs(offset) * velocity;

export const powerEasing = (power: number = 2) => (p: number): number =>
    p < 0.5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;

export const wrap = (min: number, max: number, v: number): number => {
    const rangeSize = max - min;

    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const SliderWrapper = styled.div(() => [tw`relative`]);

const SlideContent = styled.div(() => [
    tw`relative overflow-hidden`,
    css`
        height: 27.76rem;
    `,
]);

const Title = styled(MainTitleTop)(() => [
    tw`absolute z-30 uppercase select-none`,
    css`
        top: -4.35rem;
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
    tw`relative z-10 w-full h-full cursor-pointer`,
    css`
        transition: transform 0.8s;
        transform: scale(${initialSlideScale + 1});
    `,
]);

const Controls = styled.div(() => [
    tw`relative flex pt-12 justify-items-center`,
]);

const Btn = styled.div(() => [
    tw`flex-row cursor-pointer select-none lg:prose-16px w-28`,
]);

const PrevIconStyled = styled(PrevIcon)(() => [
    tw`inline-block mr-4 text-center`,
]);

const NextIconStyled = styled(NextIcon)(() => [
    tw`inline-block mr-4 text-center`,
]);

export const Slider: FunctionComponent<Props> = ({
    sliderItems,
    slideId = -1,
    page,
    direction,
    goTo,
    setIsAnimating,
    setPage,
    onSliderTap = null,
    onSliderChange = null,
    onSliderMouseEnter = null,
    onSliderMouseLeave = null,
}) => {
    const sliderRef = useRef<SliderRefHandle>(
        null
    ) as RefObject<HTMLDivElement>;

    // By passing an absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
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
        setIsAnimating,
        setPage,
    ]);

    const [mouseLeft, sliderContentRef] = useMouseLeave();

    useEffect((): void => {
        if (mouseLeft && onSliderMouseLeave) {
            onSliderMouseLeave(true);
        } else if (onSliderMouseEnter) {
            onSliderMouseEnter(false);
        }
    }, [mouseLeft, onSliderMouseEnter, onSliderMouseLeave]);

    const onSliderClick = useCallback(
        (e) => {
            if (onSliderTap) {
                onSliderTap(e, sliderItems[sliderIndex]);
            }
        },
        [onSliderTap, sliderIndex, sliderItems]
    );

    return (
        <SliderWrapper ref={sliderRef}>
            <Title
                percentage={59}
                baseFontSize={120}
                smBaseFontSize={120}
                data-text={sliderItems[sliderIndex].name}
            >
                {sliderItems[sliderIndex].name}
            </Title>
            <SlideContent ref={sliderContentRef}>
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
                        onClick={onSliderClick}
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
    );
};
