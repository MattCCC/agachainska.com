import { motion } from "@components/animation";
import { getRandomNumber } from "@utils/random-number";
import { memo, useEffect, useState } from "react";
import tw, { css, styled } from "twin.macro";

/**
 * Styles
 */
export const OverlaysWrapper = styled(motion.div)(() => [
    tw` left-0 w-full h-full`,
    css`
        z-index: 1000;
    `,
]);

export const Overlay = styled(motion.div)(() => [
    tw`absolute left-0 w-full h-full`,
    css`
        transform: translateZ(0);
    `,
]);

export const Overlay1 = styled(Overlay)(() => [
    css`
        z-index: 1010;
    `,
]);

export const Overlay2 = styled(Overlay)(() => [
    css`
        z-index: 1020;
    `,
]);

export const Overlay3 = styled(Overlay)(() => [
    css`
        z-index: 1030;
    `,
]);

/**
 * Configs
 */
export const duration = 1;

export const transition = {
    duration,
    ease: [0.43, 0.13, 0.23, 0.96],
};

export const backgroundColors = [
    ["#FF388A", "#8F38FF", "#00D99B"],
    ["#3860FF", "#FF4C38", "#FFD229"],
    ["#00D99B", "#3860FF", "#FF388A"],
    ["#FFD229", "#FF388A", "#3860FF"],
];

const ContainerVariants = {
    hidden: {
        opacity: 1,
    },
    visible: {
        opacity: 1,
        transition: {
            duration,
            staggerChildren: 1.15,
        },
        transitionEnd: {
            display: "none",
        },
    },
};

const Overlay1Variants = {
    exit: { y: "0%", transition },
    enter: {
        y: "-100%",
        transition: { ...transition, duration },
    },
};

const Overlay2Variants = {
    exit: { y: "0%", transition },
    enter: {
        y: "-100%",
        transition: { ...transition, duration: duration / 2 },
    },
};

const Overlay3Variants = {
    exit: { y: "0%", transition },
    enter: {
        y: "-100%",
        transition: { ...transition, duration: duration / 3 },
    },
};

/**
 * Component
 * @param props
 */
export const Overlays = memo(
    (): JSX.Element => {
        const [palette, setPalette] = useState([] as string[]);

        useEffect(() => {
            setPalette(
                backgroundColors[
                    getRandomNumber(0, backgroundColors.length - 1)
                ]
            );
        }, []);

        return (
            <OverlaysWrapper
                variants={ContainerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
            >
                <Overlay1
                    initial="exit"
                    animate="enter"
                    exit="exit"
                    variants={Overlay1Variants}
                    style={{ backgroundColor: palette[0] }}
                />
                <Overlay2
                    initial="exit"
                    animate="enter"
                    exit="exit"
                    variants={Overlay2Variants}
                    style={{ backgroundColor: palette[1] }}
                />
                <Overlay3
                    initial="exit"
                    animate="enter"
                    exit="exit"
                    variants={Overlay3Variants}
                    style={{ backgroundColor: palette[2] }}
                />
            </OverlaysWrapper>
        );
    }
);
