import {
    useEffect,
    useCallback,
    useRef,
    ElementRef,
    RefObject,
    useState,
    useMemo,
} from "react";

import tw, { css, styled } from "twin.macro";

import useMouse from "@react-hook/mouse-position";

import { animate, AnimatePresence, motion } from "components/animation";
import { Distortion } from "components/distortion";
import { MainTitleTop } from "components/main-title";
import { useEventListener } from "hooks/use-event-listener";
import NextIcon from "svg/down.svg";
import PrevIcon from "svg/up.svg";

import OtherProjects, { OtherProjectProp } from "./other-projects";

export interface SliderItem {
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
    otherProjects: OtherProjectProp[];
    lastProjectNumber: number;
    setIsAnimating: (newValue: boolean) => void;
    onSliderTap?:
        | ((
              e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>,
              currentItem?: SliderItem
          ) => void)
        | null;
    onSliderChange?: ((currentItem?: SliderItem) => void) | null;
    onSliderMouseEnter?: ((mouseLeft: boolean) => void) | null;
    onSliderMouseLeave?: ((mouseLeft: boolean) => void) | null;
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

const SliderWrapper = styled.div(
    ({ isShowingOtherProjects }: SliderWrapperProps) => [
        tw`relative`,
        isShowingOtherProjects && tw`h-full`,
    ]
);

const SlideContent = styled.div(
    ({ isShowingOtherProjects }: SlideContentProps) => [
        tw`relative`,
        !isShowingOtherProjects && tw`overflow-hidden`,
        !isShowingOtherProjects &&
            css`
                height: 25.8125rem;
                width: 58.0625rem;
            `,
    ]
);

const Title = styled(MainTitleTop)(() => [
    tw`absolute z-30 uppercase select-none bg-slider-title-gradient`,
    tw`text-[120px] leading-[130px] top-[-4.35rem]`,
]);

const SlidesList = styled(motion.div)(() => [
    tw`absolute w-full max-w-full`,
    css`
        height: 25.8125rem;
        width: 58.0625rem;
    `,
]);

const Slide = styled(Distortion)(() => [
    tw`relative z-10 w-full h-full cursor-pointer`,
    css`
        transition: transform 0.8s;
        transform: scale(${initialSlideScale + 1});
    `,
]);

const Controls = styled.div(({ isShowingOtherProjects }: ControlsProps) => [
    tw`relative flex pt-12 justify-items-center`,
    isShowingOtherProjects && tw`absolute bottom-0`,
]);

const Btn = styled.div(() => [
    tw`flex-row cursor-pointer select-none lg:prose-16 lg:leading-5 w-28`,
]);

const PrevIconStyled = styled(PrevIcon)(() => [
    tw`inline-block mr-4 text-center`,
]);

const NextIconStyled = styled(NextIcon)(() => [
    tw`inline-block mr-4 text-center`,
]);

export const Slider = ({
    sliderItems,
    slideId = -1,
    mouseScrollOnSlide = false,
    showSlideTitle = false,
    isAnimating,
    setIsAnimating,
    isShowingOtherProjects,
    otherProjects,
    lastProjectNumber,
    onSliderTap = null,
    onSliderChange = null,
    onSliderMouseEnter = null,
    onSliderMouseLeave = null,
}: Props) => {
    const [[page, direction], setPage] = useState([0, 0]);
    const numItems = useMemo(() => sliderItems.length, [sliderItems]);

    const sliderRef = useRef<SliderRefHandle>(
        null
    ) as RefObject<HTMLDivElement>;

    // By passing an absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
    // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
    const sliderIndex = useMemo(
        () => wrap(0, numItems, page),
        [numItems, page]
    );

    // Orchestrate distortion animation
    const orchestrateVectorAnimation = useCallback(
        (from = 0, to = 100, slideNo = 0) => {
            const requestID = requestAnimationFrame(() => {
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
                            cancelAnimationFrame(requestID);
                            setIsAnimating(false);

                            return;
                        }

                        orchestrateVectorAnimation(100, 0, slideNo);
                    },
                });
            });
        },
        [setIsAnimating]
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

            const currentSliderItem = wrap(0, numItems, newStateDirection);

            if (onSliderChange) {
                onSliderChange(sliderItems[currentSliderItem]);
            }
        },
        [
            isAnimating,
            page,
            setIsAnimating,
            orchestrateVectorAnimation,
            numItems,
            onSliderChange,
            sliderItems,
        ]
    );

    const onDragEnd = useCallback(
        (
            _e: Event,
            {
                offset,
                velocity,
            }: {
                offset: { x: number; y: number };
                velocity: { x: number; y: number };
            }
        ): void => {
            const swipe = swipePower(offset.x, velocity.x);

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

    // Animate to particular slide
    useEffect(() => {
        if (slideId < 0 || page === slideId || slideId > numItems - 1) {
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
        numItems,
    ]);

    const sliderContentRef = useRef(null);
    const mouse = useMouse(sliderContentRef, {
        enterDelay: 30,
        leaveDelay: 30,
    });

    useEffect(() => {
        const isMouseOver = Boolean(mouse.elementWidth);

        if (!isMouseOver && onSliderMouseLeave && !isShowingOtherProjects) {
            onSliderMouseLeave(true);
        } else if (onSliderMouseEnter && !isShowingOtherProjects) {
            onSliderMouseEnter(false);
        }
    }, [
        isShowingOtherProjects,
        mouse.elementWidth,
        onSliderMouseEnter,
        onSliderMouseLeave,
    ]);

    useEventListener(
        "wheel",
        (e) => {
            if (Boolean(mouse.elementWidth) && mouseScrollOnSlide) {
                e.preventDefault();

                updateScroll(e as WheelEvent);
            }
        },
        (typeof document !== "undefined" &&
            (document.body as unknown)) as RefObject<HTMLDivElement>,
        { passive: false }
    );

    const onSliderClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (onSliderTap) {
                onSliderTap(e, sliderItems[sliderIndex]);
            }
        },
        [onSliderTap, sliderIndex, sliderItems]
    );

    return (
        <SliderWrapper
            isShowingOtherProjects={isShowingOtherProjects}
            ref={sliderRef}
        >
            {showSlideTitle && (
                <Title data-text={sliderItems[sliderIndex]?.name || ""}>
                    {sliderItems[sliderIndex]?.name || ""}
                </Title>
            )}
            <SlideContent
                ref={sliderContentRef}
                isShowingOtherProjects={isShowingOtherProjects}
            >
                {isShowingOtherProjects ? (
                    <OtherProjects
                        otherProjects={otherProjects}
                        lastProjectNumber={lastProjectNumber}
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
                {page < numItems - 1 && (
                    <Btn onClick={(): void => goToSlide(1)}>
                        <NextIconStyled /> Next
                    </Btn>
                )}
                {page > 0 && (
                    <Btn onClick={(): void => goToSlide(-1)}>
                        <PrevIconStyled /> Previous
                    </Btn>
                )}
            </Controls>
        </SliderWrapper>
    );
};
