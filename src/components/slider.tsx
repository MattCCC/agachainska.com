import { useState } from "react";
import tw, { css, styled } from "twin.macro";
import { motion, MotionProps, AnimatePresence } from "@components/animation";
import { ReactComponent as PrevIcon } from "@svg/down.svg";
import { ReactComponent as NextIcon } from "@svg/up.svg";

/**
 * Style
 */
const SliderWrapper = styled.div(() => [tw`relative col-start-1 col-end-4 col-span-4 row-start-1 row-end-6 row-span-6`]);

const Title = styled.h1(() => [
    tw`absolute w-9/12 lg:prose-120px uppercase z-50 select-none`,
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

const SlideItem = styled(motion.div)(() => [tw`relative w-auto pb-12`]);

const SlidePattern = styled.img(() => [tw`absolute w-full h-full z-40`]);

const SlideImg = styled.img(() => [tw`relative w-full h-full z-10`]);

const Controls = styled.div(() => [tw`relative flex justify-items-center`]);

const Btn = styled.div(() => [tw`lg:prose-16px w-28 flex-row`]);

const PrevIconStyled = styled(PrevIcon)(() => [
    tw`inline-block text-center mr-4`,
]);

const NextIconStyled = styled(NextIcon)(() => [
    tw`inline-block text-center mr-4`,
]);


const variants = {
    enter: (direction: number) => ({
        y: direction > 0 ? 1000 : -800,
        opacity: 0
    }),
    center: {
        zIndex: 1,
        y: 0,
        opacity: 1
    },
    exit: (direction: number) => ({
        zIndex: 0,
        y: direction < 0 ? 1000 : -800,
        opacity: 0
    })
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

interface Props { }

/**
 * Component
 * @param props
 */
export function Slider(props: Props): JSX.Element {
    const [[page, direction], setPage] = useState([0, 0]);

    // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
    // then wrap that within 0-2 to find our image ID in the array below. By passing an
    // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
    // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
    // const imageIndex = wrap(0, images.length, page);

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    return (
        <SliderWrapper>
            <Title
                data-text={"Danish Bakery"}
            >Danish Bakery</Title>
            <AnimatePresence initial={false} custom={direction}>
                <SlideItem
                    key={page}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        y: { type: "spring", stiffness: 300, damping: 50 },
                        opacity: { duration: 0.2 }
                    }}
                >
                    <SlidePattern src="./img/slider-pattern.png" />
                    <SlideImg src="./img/projects/danish-bakery.png" />
                </SlideItem>
            </AnimatePresence>
            <Controls>
                <Btn onClick={(): void => paginate(1)}>
                    <NextIconStyled /> Next
                    </Btn>
                <Btn onClick={(): void => paginate(-1)}>
                    <PrevIconStyled /> Previous
                    </Btn>
            </Controls>
        </SliderWrapper>
    );
}
