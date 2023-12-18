import {
    useCallback,
    useState,
    useMemo,
    useEffect,
    memo,
    PropsWithChildren,
    useRef,
    Fragment,
    CSSProperties,
} from "react";

import tw, { styled } from "twin.macro";

import { Distortion } from "components/distortion";
import { MainTitleTop } from "components/main-title";
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
    className?: string;
}

// eslint-disable-next-line no-shadow
enum Direction {
    Top = -1,
    Bottom = 1,
}

const duration = 0.8;

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
    tw`absolute z-10 w-full h-[25.8125rem] max-w-full cursor-pointer`,
    tw`[transform:translateY(calc(var(--translate-value) * var(--scale-value))) scale(var(--scale-value))] transition-transform duration-800 delay-[var(--delay)]`,
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

function wrap(numItems: number, slide: number) {
    return ((slide % numItems) + numItems) % numItems;
}

export const Slider = memo(
    ({
        sliderItems,
        slideId = -1,
        showSlideTitle = false,
        setIsAnimating,
        onSliderTap = null,
        onSliderChange = null,
        onSliderMouseEnter = null,
        onSliderMouseLeave = null,
        className = "",
        children,
    }: PropsWithChildren<Props>) => {
        const [defaultSlideId, setDefaultSlideId] = useState(0);
        const [[currentSlideId, previousSlideId], setSlide] = useState<
            [null | number, null | number, number]
        >([null, null, 0]);
        const numItems = useMemo(() => sliderItems.length, [sliderItems]);

        const currentId = currentSlideId || 0;

        // By passing an absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
        // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
        const sliderIndex = useMemo(
            () => wrap(numItems, currentId),
            [numItems, currentId]
        );

        const sliderRef = useRef<HTMLDivElement>(null);

        // Orchestrate distortion animation
        const orchestrateVectorAnimation = useCallback(() => {
            // There should be exactly 2 elements. One added and one being removed
            const previousSlide = document.getElementById(
                `displacement-${previousSlideId}`
            ) as SVGFEDisplacementMapElement | null;
            const newSlide = document.getElementById(
                `displacement-${currentId}`
            ) as SVGFEDisplacementMapElement | null;

            const onUpdate = (v: number) => {
                if (previousSlide) {
                    previousSlide.scale.baseVal = v;
                }

                if (newSlide) {
                    newSlide.scale.baseVal = v;
                }
            };

            animate(0, 100, (1000 * duration) / 2, onUpdate, () => {
                animate(100, 0, (1000 * duration) / 2, onUpdate, () => {
                    setIsAnimating(false);
                });
            });
        }, [previousSlideId, currentId, setIsAnimating]);

        const goToSlide = useCallback(
            (
                newDirection: Direction,
                newSlideId: number | null = null
            ): void => {
                const newSlideNo = newSlideId ?? currentId + newDirection;

                setIsAnimating(true);
                setSlide([newSlideNo, currentId, newDirection]);

                const currentSliderItem = wrap(numItems, newSlideNo);

                if (onSliderChange) {
                    onSliderChange(sliderItems[currentSliderItem]);
                }
            },
            [currentId, setIsAnimating, numItems, onSliderChange, sliderItems]
        );

        // Orchestrate animation on the next render
        useEffect(() => {
            if (currentSlideId !== null && currentSlideId !== previousSlideId) {
                orchestrateVectorAnimation();
            }
        }, [orchestrateVectorAnimation, previousSlideId, currentSlideId]);

        // Animate to a specific slide when slide is changed in HOC
        useEffect(() => {
            if (slideId !== defaultSlideId) {
                goToSlide(Direction.Top, slideId);
                setDefaultSlideId(slideId);
            }
        }, [defaultSlideId, goToSlide, slideId]);

        const onHoverStart = useCallback(() => {
            if (onSliderMouseEnter) {
                onSliderMouseEnter(true);
            }

            if (onSliderMouseLeave) {
                onSliderMouseLeave(false);
            }
        }, [onSliderMouseEnter, onSliderMouseLeave]);

        const onHoverEnd = useCallback(() => {
            if (onSliderMouseEnter) {
                onSliderMouseEnter(false);
            }

            if (onSliderMouseLeave) {
                onSliderMouseLeave(true);
            }
        }, [onSliderMouseEnter, onSliderMouseLeave]);

        const onSlideClick = useCallback(
            (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                if (onSliderTap) {
                    onSliderTap(e, sliderItems[sliderIndex]);
                }
            },
            [onSliderTap, sliderIndex, sliderItems]
        );

        return (
            <SliderWrapper ref={sliderRef} className={className}>
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
                        {sliderItems.map((slide, index) => {
                            if (!slide.cover) {
                                return <Fragment key={slide.id}></Fragment>;
                            }

                            return (
                                <Slide
                                    id={`slide-${index}`}
                                    key={slide.id}
                                    style={
                                        {
                                            "--delay":
                                                index === previousSlideId
                                                    ? "400ms"
                                                    : 0,
                                            "--translate-value":
                                                index === currentId
                                                    ? "0%"
                                                    : "-100%",
                                            zIndex:
                                                index === currentId ? 10 : 5,
                                        } as CSSProperties
                                    }
                                >
                                    <Distortion
                                        id={String(index)}
                                        imgUrl={slide.cover}
                                    />
                                </Slide>
                            );
                        })}
                    </SliderContent>
                </Container>
                <Controls>
                    {currentId < numItems - 1 && (
                        <Btn onClick={(): void => goToSlide(1)}>
                            <NextIconStyled /> Next
                        </Btn>
                    )}
                    {currentId > 0 && (
                        <Btn onClick={(): void => goToSlide(-1)}>
                            <PrevIconStyled /> Previous
                        </Btn>
                    )}
                </Controls>
            </SliderWrapper>
        );
    }
);
