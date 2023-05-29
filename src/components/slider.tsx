import {
    useEffect,
    useCallback,
    useRef,
    ElementRef,
    RefObject,
    useState,
    useMemo,
} from "react";

import tw, { styled } from "twin.macro";

import useMouse from "@react-hook/mouse-position";

import { animate, AnimatePresence, motion } from "framer-motion";
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

interface ControlsProps {
    isShowingOtherProjects: boolean;
}

enum Direction {
    Top = -1,
    Bottom = 1,
}

type SliderRefHandle = ElementRef<typeof Slider>;

const duration = 1;
const height = 445;
const initialSlideScale = 0.25;

const variants = {
    enter: (direction: Direction): Record<string, any> => ({
        zIndex: 1,
        top:
            direction === Direction.Bottom
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
    exit: (direction: Direction): Record<string, any> => ({
        zIndex: 0,
        top: direction === Direction.Top ? height : -height,
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

const SliderWrapper = styled.div(() => [tw`relative h-full`]);

const SliderContent = styled.div(
    ({ isShowingOtherProjects }: SlideContentProps) => [
        tw`relative w-full`,
        !isShowingOtherProjects && tw`overflow-hidden h-[25.8125rem]`,
    ]
);

const Title = styled(MainTitleTop)(() => [
    tw`absolute z-30 uppercase select-none bg-slider-title-gradient`,
    tw`text-[120px] leading-[130px] top-[-4.35rem]`,
]);

const SlidesList = styled(motion.div)(() => [
    tw`absolute w-full max-w-full h-[25.8125rem]`,
]);

const Slide = styled.div(() => [
    tw`relative z-10 w-full h-full cursor-pointer`,
    tw`[transform:scale(1.25)] transition-transform duration-800 hover:[transform:scale(1)]`,
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

const wheelEventOptions = { passive: false };

const documentBody = (typeof document !== "undefined" &&
    (document.body as unknown)) as RefObject<HTMLDivElement>;

export const Slider = ({
    sliderItems,
    slideId = -1,
    mouseScrollOnSlide = false,
    showSlideTitle = false,
    setIsAnimating,
    isShowingOtherProjects,
    otherProjects,
    lastProjectNumber,
    onSliderTap = null,
    onSliderChange = null,
    onSliderMouseEnter = null,
    onSliderMouseLeave = null,
}: Props) => {
    const [defaultSlideId, setDefaultSlideId] = useState(0);
    const [[slide, direction], setSlide] = useState([0, 0]);
    const numItems = useMemo(() => sliderItems.length, [sliderItems]);

    const sliderRef = useRef<SliderRefHandle>(
        null
    ) as RefObject<HTMLDivElement>;

    // By passing an absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
    // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
    const sliderIndex = useMemo(
        () => wrap(0, numItems, slide),
        [numItems, slide]
    );

    // Orchestrate distortion animation
    const orchestrateVectorAnimation = useCallback(
        (from = 0, to = 100) => {
            animate(from, to, {
                duration: duration / 2,
                ease: powerEasing(2),
                onUpdate: (v) => {
                    const displacementEls =
                        document.querySelectorAll("feDisplacementMap");
                    const len = displacementEls.length;

                    for (let i = 0; i < len; i++) {
                        const el = displacementEls[
                            i
                        ] as SVGFEDisplacementMapElement;

                        el.scale.baseVal = v;
                    }
                },
                onComplete: () => {
                    if (to) {
                        orchestrateVectorAnimation(100, 0);

                        return;
                    }

                    setIsAnimating(false);
                },
            });
        },
        [setIsAnimating]
    );

    const goToSlide = useCallback(
        (newDirection: Direction, newSlide: number | null = null): void => {
            const newSlideNo = newSlide ?? slide + newDirection;

            setIsAnimating(true);
            setSlide([newSlideNo, newDirection]);
            orchestrateVectorAnimation(0, 100);

            const currentSliderItem = wrap(0, numItems, newSlideNo);

            if (onSliderChange) {
                onSliderChange(sliderItems[currentSliderItem]);
            }
        },
        [
            slide,
            setIsAnimating,
            orchestrateVectorAnimation,
            numItems,
            onSliderChange,
            sliderItems,
        ]
    );

    // Animate to a specific slide
    if (slideId !== defaultSlideId) {
        setTimeout(() => {
            setDefaultSlideId(slideId);

            goToSlide(Direction.Top, slideId);
        }, 0);
    }

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

    const wheelCallback = useCallback(
        (e: Event) => {
            if (mouseScrollOnSlide && Boolean(mouse.elementWidth)) {
                e.preventDefault();

                updateScroll(e as WheelEvent);
            }
        },
        [mouse.elementWidth, mouseScrollOnSlide, updateScroll]
    );

    useEventListener("wheel", wheelCallback, documentBody, wheelEventOptions);

    const onSlideClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (onSliderTap) {
                onSliderTap(e, sliderItems[sliderIndex]);
            }
        },
        [onSliderTap, sliderIndex, sliderItems]
    );

    const handleExitComplete = useCallback((): void => {
        setIsAnimating(false);
    }, [setIsAnimating]);

    return (
        <SliderWrapper ref={sliderRef}>
            {showSlideTitle && (
                <Title data-text={sliderItems[sliderIndex]?.name ?? ""}>
                    {sliderItems[sliderIndex]?.name ?? ""}
                </Title>
            )}
            <SliderContent
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
                        onExitComplete={handleExitComplete}
                    >
                        <SlidesList
                            key={slide}
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
                            onClick={onSlideClick}
                        >
                            <Slide>
                                <Distortion
                                    id={String(slide)}
                                    imgUrl={
                                        sliderItems[sliderIndex]?.cover ?? ""
                                    }
                                    key={`slide-${slide}`}
                                />
                            </Slide>
                        </SlidesList>
                    </AnimatePresence>
                )}
            </SliderContent>
            <Controls isShowingOtherProjects={isShowingOtherProjects}>
                {slide < numItems - 1 && (
                    <Btn onClick={(): void => goToSlide(1)}>
                        <NextIconStyled /> Next
                    </Btn>
                )}
                {slide > 0 && (
                    <Btn onClick={(): void => goToSlide(-1)}>
                        <PrevIconStyled /> Previous
                    </Btn>
                )}
            </Controls>
        </SliderWrapper>
    );
};
