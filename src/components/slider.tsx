import {
    useCallback,
    RefObject,
    useState,
    useMemo,
    useEffect,
    memo,
    PropsWithChildren,
    useRef,
} from "react";

import tw, { styled } from "twin.macro";

import { AnimatePresence, PanInfo, motion, wrap } from "framer-motion";
import { Distortion } from "components/distortion";
import { MainTitleTop } from "components/main-title";
import { useEventListener } from "hooks/use-event-listener";
import NextIcon from "svg/down.svg";
import PrevIcon from "svg/up.svg";

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

// eslint-disable-next-line no-shadow
enum Direction {
    Top = -1,
    Bottom = 1,
}

const duration2 = 1;
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
            duration: duration2,
        },
    },
    exit: (direction: Direction): Record<string, any> => ({
        zIndex: 0,
        top: direction === Direction.Top ? height : -height,
        transition: {
            duration: duration2,
        },
    }),
};

const sliderTransition = {
    top: {
        type: "spring",
        stiffness: 100,
        damping: 15,
    },
    opacity: { duration: duration2 },
};

const SliderWrapper = styled.div(() => [tw`relative h-full cursor-none`]);

const Container = styled.div(() => [
    tw`[--scale-value:1.25] lg:hover:[--scale-value:1]`,
]);

const SliderContent = styled.div(() => [
    tw`relative w-full overflow-hidden h-[25.8125rem]`,
]);

const Title = styled(MainTitleTop)(() => [
    tw`absolute z-30 uppercase select-none bg-slider-title-gradient cursor-none`,
    tw`text-[120px] leading-[130px] top-[-4.35rem]`,
]);

const Slide = styled.div(() => [
    tw`relative z-10 w-full h-full cursor-pointer`,
    tw`[transform:scale(var(--scale-value))] transition-transform duration-800`,
]);

export const Controls = styled.div(() => [
    tw`relative flex pt-12 justify-items-center`,
]);

export const Btn = styled.div(() => [
    tw`flex-row cursor-pointer select-none lg:text-[16px] lg:leading-5 w-28`,
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

const animate = (
    start: number,
    end: number,
    animationDuration: number,
    onUpdate: (value: number) => void,
    onComplete: () => void
): void => {
    const startTime = performance.now();

    const update = (): void => {
        const currentTime = performance.now();
        const progress = Math.min(
            1,
            (currentTime - startTime) / animationDuration
        );

        const easedProgress = defaultEase(progress);
        const animatedValue = start + (end - start) * easedProgress;

        onUpdate(animatedValue);

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            onComplete();
        }
    };

    update();
};

function defaultEase(t: number): number {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export const Slider = memo(
    ({
        sliderItems,
        slideId = -1,
        mouseScrollOnSlide = false,
        showSlideTitle = false,
        setIsAnimating,
        onSliderTap = null,
        onSliderChange = null,
        onSliderMouseEnter = null,
        onSliderMouseLeave = null,
        children,
    }: PropsWithChildren<Props>) => {
        const [defaultSlideId, setDefaultSlideId] = useState(0);
        const [[slide, direction], setSlide] = useState([0, 0]);
        const numItems = useMemo(() => sliderItems.length, [sliderItems]);

        // By passing an absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
        // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
        const sliderIndex = useMemo(
            () => wrap(0, numItems, slide),
            [numItems, slide]
        );

        const sliderRef = useRef<HTMLDivElement>(null);

        // Orchestrate distortion animation
        const orchestrateVectorAnimation = useCallback(() => {
            const displacementEls = sliderRef?.current?.querySelectorAll(
                "feDisplacementMap"
            ) as NodeListOf<SVGFEDisplacementMapElement>;

            // There should be exactly 2 elements. Added and removed one
            if (displacementEls.length < 2) {
                return;
            }

            const onUpdate = (v: number) => {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                displacementEls[0]!.scale.baseVal = v;
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                displacementEls[1]!.scale.baseVal = v;
            };

            animate(0, 100, (1000 * duration2) / 2, onUpdate, () => {
                animate(100, 0, (1000 * duration2) / 2, onUpdate, () => null);
            });
        }, [sliderRef]);

        const goToSlide = useCallback(
            (newDirection: Direction, newSlide: number | null = null): void => {
                const newSlideNo = newSlide ?? slide + newDirection;

                setIsAnimating(true);
                setSlide([newSlideNo, newDirection]);

                const currentSliderItem = wrap(0, numItems, newSlideNo);

                if (onSliderChange) {
                    onSliderChange(sliderItems[currentSliderItem]);
                }
            },
            [slide, setIsAnimating, numItems, onSliderChange, sliderItems]
        );

        // Orchestrate animation on the next render
        useEffect(() => {
            if (slide !== null) {
                orchestrateVectorAnimation();
            }
        }, [orchestrateVectorAnimation, slide]);

        // Animate to a specific slide when slide is changed in HOC
        useEffect(() => {
            if (slideId !== defaultSlideId) {
                goToSlide(Direction.Top, slideId);
                setDefaultSlideId(slideId);
            }
        }, [defaultSlideId, goToSlide, slideId]);

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

        const [isHovering, setIsHovering] = useState(false);

        const onHoverStart = useCallback(() => {
            if (onSliderMouseEnter) {
                onSliderMouseEnter(true);
            }

            if (onSliderMouseLeave) {
                onSliderMouseLeave(false);
            }

            setIsHovering(true);
        }, [onSliderMouseEnter, onSliderMouseLeave]);

        const onHoverEnd = useCallback(() => {
            if (onSliderMouseEnter) {
                onSliderMouseEnter(false);
            }

            if (onSliderMouseLeave) {
                onSliderMouseLeave(true);
            }

            setIsHovering(false);
        }, [onSliderMouseEnter, onSliderMouseLeave]);

        const wheelCallback = useCallback(
            (e: Event) => {
                if (mouseScrollOnSlide && isHovering) {
                    e.preventDefault();

                    updateScroll(e as WheelEvent);
                }
            },
            [isHovering, mouseScrollOnSlide, updateScroll]
        );

        useEventListener(
            "wheel",
            wheelCallback,
            documentBody,
            wheelEventOptions
        );

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
                <Container
                    onMouseEnter={onHoverStart}
                    onMouseLeave={onHoverEnd}
                    onClick={onSlideClick}
                >
                    {children}
                    {showSlideTitle && (
                        <Title data-text={sliderItems[sliderIndex]?.name ?? ""}>
                            {sliderItems[sliderIndex]?.name ?? ""}
                        </Title>
                    )}
                    <SliderContent>
                        <AnimatePresence
                            custom={direction}
                            initial={false}
                            onExitComplete={handleExitComplete}
                        >
                            <motion.div
                                key={slide}
                                className="absolute w-full max-w-full h-[25.8125rem]"
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={sliderTransition}
                            >
                                <Slide>
                                    <Distortion
                                        id={String(slide)}
                                        imgUrl={
                                            sliderItems[sliderIndex]?.cover ??
                                            ""
                                        }
                                        key={`slide-${slide}`}
                                    />
                                </Slide>
                            </motion.div>
                        </AnimatePresence>
                    </SliderContent>
                </Container>
                <Controls>
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
    }
);
