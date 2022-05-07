import {
    useEffect,
    useCallback,
    useRef,
    ElementRef,
    RefObject,
    FunctionComponent,
    useState,
} from "react";

import tw, { css, styled } from "twin.macro";
import useMouseLeave from "use-mouse-leave";

import { animate, AnimatePresence, motion } from "@components/animation";
import { Distortion } from "@components/distortion";
import { MainTitleTop } from "@components/main-title";
import { useEventListener } from "@hooks/use-event-listener";
import { ReactComponent as NextIcon } from "@svg/down.svg";
import { ReactComponent as PrevIcon } from "@svg/up.svg";

import OtherProjects, { OtherProject } from "./other-projects";

export interface SliderItem {
    [x: string]: any;
    name: string;
    cover: string;
    id: string;
}

interface Props {
    sliderItems: SliderItem[];
    slideId: number;
    isAnimating: boolean;
    showSlideTitle?: boolean;
    mouseScrollOnSlide?: boolean;
    isShowingOtherProjects: boolean;
    otherProjects: OtherProject[];
    lastProjectNumber: number;
    customSlides?: Record<string, any>;
    setIsAnimating: (newValue: boolean) => void;
    onSliderTap?: (
        e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>,
        currentItem: SliderItem
    ) => void;
    onSliderChange?: (currentItem: SliderItem) => void;
    onSliderMouseEnter?: (mouseLeft: boolean) => void;
    onSliderMouseLeave?: (mouseLeft: boolean) => void;
}

interface SlideContentProps {
    isShowingOtherProjects?: boolean;
}

interface SliderWrapperProps {
    isShowingOtherProjects: boolean;
}

interface ControlsProps {
    isShowingOtherProjects: boolean;
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

export const powerEasing =
    (power: number = 2) =>
    (p: number): number =>
        p < 0.5
            ? Math.pow(p * 2, power) / 2
            : 1 - Math.pow((1 - p) * 2, power) / 2;

export const wrap = (min: number, max: number, v: number): number => {
    const rangeSize = max - min;

    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const SliderWrapper = styled.div(({isShowingOtherProjects}: SliderWrapperProps) => [tw`relative`, isShowingOtherProjects && tw`h-screen`]);

const SlideContent = styled.div(({isShowingOtherProjects}: SlideContentProps) => [
    tw`relative`,
    !isShowingOtherProjects && tw`overflow-hidden`,
    !isShowingOtherProjects && css`
        height: 27.76rem;`,


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

const Controls = styled.div(({isShowingOtherProjects}: ControlsProps) => [
    tw`relative flex pt-12 justify-items-center`, isShowingOtherProjects && tw`absolute bottom-0`
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
    mouseScrollOnSlide = false,
    showSlideTitle = false,
    isAnimating,
    setIsAnimating,
    customSlides = {},
    isShowingOtherProjects,
    otherProjects,
    lastProjectNumber,
    onSliderTap = null,
    onSliderChange = null,
    onSliderMouseEnter = null,
    onSliderMouseLeave = null,
}) => {
    const [[page, direction], setPage] = useState([0, 0]);

    const sliderRef = useRef<SliderRefHandle>(
        null
    ) as RefObject<HTMLDivElement>;

    // By passing an absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
    // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
    const sliderIndex = wrap(0, sliderItems.length, page);

    // Orchestrate distortion animation
    const orchestrateVectorAnimation = useCallback(
        (from = 0, to = 100, slideNo = 0) => {
            requestAnimationFrame(() => {
                animate(from, to, {
                    duration: duration / 2,
                    ease: powerEasing(2),
                    onUpdate: (v) => {
                        // Access element that is about to be removed from the DOM
                        // This way we avoid rendering roundtrips
                        const els =
                            document?.querySelectorAll("feDisplacementMap");

                        els.forEach((el) => {
                            if (el) {
                                el.scale.baseVal = v;
                            }
                        });
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
        []
    );

    const goToSlide = useCallback(
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

            if (onSliderChange) {
                onSliderChange(sliderItems[currentSliderItem]);
            }
        },
        [
            isAnimating,
            page,
            setIsAnimating,
            setPage,
            orchestrateVectorAnimation,
            sliderItems,
            onSliderChange,
        ]
    );

    const onDragEnd = useCallback(
        (_e, { offset, velocity }): void => {
            const swipe = swipePower(offset.x as number, velocity.x as number);

            if (swipe < -swipeConfidenceThreshold) {
                goToSlide(-1);
            } else if (swipe > swipeConfidenceThreshold) {
                goToSlide(1);
            }
        },
        [goToSlide]
    );

    const updateScroll = useCallback(
        (e: WheelEvent): void => {
            const isUp = e.deltaY && e.deltaY < 0;

            if (isUp) {
                goToSlide(-1);
            } else {
                goToSlide(1);
            }
        },
        [goToSlide]
    );

    const renderCustomSlide = useCallback(
        (slideData, index) => {
            const slideComponents = Object.keys(customSlides);

            for (const slidePartialName of slideComponents) {
                if (slideData.id.includes(slidePartialName)) {
                    return (
                        <div key={`slide-${index}`}>
                            {customSlides[slidePartialName]}
                        </div>
                    );
                }
            }

            return null;
        },
        [customSlides]
    );

    // Animate to particular slide
    useEffect(() => {
        if (
            slideId < 0 ||
            page === slideId ||
            slideId > sliderItems.length - 1
        ) {
            return;
        }

        setIsAnimating(true);
        setPage([slideId, sliderIndex > 0 ? 1 : -1]);
        orchestrateVectorAnimation(0, 100, slideId);

        if (onSliderChange) {
            onSliderChange(sliderItems[slideId]);
        }
    }, [
        onSliderChange,
        sliderItems,
        sliderIndex,
        slideId,
        page,
        goToSlide,
        orchestrateVectorAnimation,
        setIsAnimating,
        setPage,
    ]);

    const [mouseLeft, sliderContentRef] = useMouseLeave();

    useEventListener(
        "wheel",
        (e) => {
            if (!mouseLeft && mouseScrollOnSlide) {
                e.preventDefault();

                updateScroll(e as WheelEvent);
            }
        },
        (typeof document !== "undefined" &&
            (document.body as unknown)) as RefObject<HTMLDivElement>,
        { passive: false }
    );

    useEffect((): void => {
        if (mouseLeft && onSliderMouseLeave) {
            onSliderMouseLeave(true);
        } else if (onSliderMouseEnter) {
            onSliderMouseEnter(false);
        }
    }, [mouseLeft, onSliderMouseEnter, onSliderMouseLeave]);

    const onSliderClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (onSliderTap) {
                onSliderTap(e, sliderItems[sliderIndex]);
            }
        },
        [onSliderTap, sliderIndex, sliderItems]
    );

    return (
        <SliderWrapper isShowingOtherProjects={isShowingOtherProjects} ref={sliderRef}>
            {showSlideTitle && (
                <Title
                    percentage={59}
                    baseFontSize={120}
                    smBaseFontSize={120}
                    data-text={sliderItems[sliderIndex].name}
                >
                    {sliderItems[sliderIndex].name}
                </Title>
            )}
            <SlideContent ref={sliderContentRef} isShowingOtherProjects={isShowingOtherProjects}>

                {isShowingOtherProjects ? (
                        <OtherProjects
                            isShowingOtherProjects={
                                isShowingOtherProjects
                            }
                            otherProjects={
                                otherProjects
                            }
                            lastProjectNumber={
                                lastProjectNumber
                            }
                        />
                    ) : (
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
                        />
                    </SlidesList>
                </AnimatePresence>
                    )}
            </SlideContent>
            <Controls isShowingOtherProjects={isShowingOtherProjects}>
                <Btn onClick={(): void => goToSlide(1)}>
                    <NextIconStyled /> Next
                </Btn>
                <Btn onClick={(): void => goToSlide(-1)}>
                    <PrevIconStyled /> Previous
                </Btn>
            </Controls>
        </SliderWrapper>
    );
};
