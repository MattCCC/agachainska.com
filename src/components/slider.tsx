import { useState, Fragment, useEffect } from "react";
import tw, { css, styled } from "twin.macro";
import { motion, MotionProps, AnimatePresence } from "@components/animation";
import { ReactComponent as PrevIcon } from "@svg/down.svg";
import { ReactComponent as NextIcon } from "@svg/up.svg";

/**
 * Style
 */
const SliderWrapper = styled.div(() => [tw`relative`]);

const SlideContent = styled.div(() => [
    tw`overflow-hidden`,
    css`
        height: 27.76rem;
    `
]);


const Title = styled.h1(() => [
    tw`absolute w-1/2 lg:prose-120px uppercase z-50 select-none`,
    css`
        top: -5.35rem;
        color: var(--black-color);
        background: linear-gradient(180deg,var(--black-color) 33%,transparent 32%);
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

const SlidesList = styled(motion.div)(() => [tw`relative w-auto`]);
// pb-12

const SlideImg = styled.img(() => [tw`relative w-full h-full z-10`]);

const Controls = styled.div(() => [tw`relative pt-12 flex justify-items-center`]);

const Btn = styled.div(() => [tw`lg:prose-16px w-28 flex-row`]);

const PrevIconStyled = styled(PrevIcon)(() => [
    tw`inline-block text-center mr-4`,
]);

const NextIconStyled = styled(NextIcon)(() => [
    tw`inline-block text-center mr-4`,
]);


const variants = {
    enter: (direction: number) => ({
        y: direction > 0 ? 1000 : -1000,
        // opacity: 0
    }),
    center: {
        // zIndex: 1,
        y: 0,
        // opacity: 1
    },
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

/**
 * Interfaxces
 */

interface Props {
    images: string[];
}

export const wrap = (min: number, max: number, v: number): number => {
    const rangeSize = max - min;

    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

/**
 * Component
 * @param props
 */
export function Slider({ images }: Props): JSX.Element {
    const [[page, direction, lastIndex], setPage] = useState([0, 0, 0]);

    // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
    // then wrap that within 0-2 to find our image ID in the array below. By passing an
    // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
    // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
    const imageIndex = wrap(0, images.length, page);
    const lastImageIndex = wrap(0, images.length, lastIndex);

    const paginate = (newDirection: number): void => {
        setPage([page + newDirection, newDirection, page]);
    };

    return (
        <Fragment>
            <SliderWrapper>
                <Title
                    data-text={"Danish Bakery"}
                >Danish Bakery</Title>
                <AnimatePresence initial={false} custom={direction}>
                    <SlideContent>
                        <SlidesList
                            key={page}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            transition={{
                                y: {
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 15
                                },
                                opacity: { duration: 0.2 }
                            }}
                        >
                            {/* {
                                images.map((image, index) => (<SlideImg key={index} src={image} />))
                            } */}
                            <SlideImg src={images[lastImageIndex]} />
                            <SlideImg src={images[imageIndex]} />
                            <SlideImg src={images[lastImageIndex]} />
                        </SlidesList>
                    </SlideContent>
                    <Controls>
                        <Btn onClick={(): void => paginate(1)}>
                            <NextIconStyled /> Next
                                </Btn>
                        <Btn onClick={(): void => paginate(-1)}>
                            <PrevIconStyled /> Previous
                                </Btn>
                    </Controls>
                </AnimatePresence>
            </SliderWrapper>
        </Fragment>
    );
}
