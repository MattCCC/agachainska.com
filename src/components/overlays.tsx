import { motion, AnimateSharedLayout } from "@components/animation";
import { getRandomNumber } from "@utils/random-number";
import { memo, useEffect, useState } from "react";
import { useLocation } from "@reach/router";
import { useStore } from "@store/index";

/**
 * Styles
 */
const overlayStyleClasses = "absolute left-0 w-full h-full";

/**
 * Configs
 */
export const duration = 1;

export const transition = {
    duration,
    ease: [0.43, 0.13, 0.23, 0.96],
};

export const backgroundColors = [["#F5A4FF", "#C0A4FF", "#61F1F8"]];

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
        const location = useLocation();
        const [state] = useStore();
        const [palette, setPalette] = useState([] as string[]);
        const multiOverlays =
            state.currentDelayedRoute === "/" || location.pathname === "/";

        const motionProps = {
            className: overlayStyleClasses,
            initial: "exit",
            animate: "enter",
        };

        // Multiple background colors
        useEffect(() => {
            setPalette(
                backgroundColors[
                    getRandomNumber(0, backgroundColors.length - 1)
                ]
            );
        }, [setPalette]);

        return (
            <AnimateSharedLayout>
                <motion.div
                    layout
                    className="left-0 w-full h-full"
                    style={{
                        zIndex: 1000,
                        display: multiOverlays ? "block" : "none",
                    }}
                    variants={ContainerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        {...motionProps}
                        style={{
                            backgroundColor: palette[0],
                            zIndex: 1010,
                        }}
                        variants={Overlay1Variants}
                    />
                    <motion.div
                        {...motionProps}
                        style={{
                            backgroundColor: palette[1],
                            zIndex: 1020,
                        }}
                        variants={Overlay2Variants}
                    />
                    <motion.div
                        {...motionProps}
                        style={{
                            backgroundColor: palette[2],
                            zIndex: 1030,
                        }}
                        variants={Overlay3Variants}
                    />
                </motion.div>
            </AnimateSharedLayout>
        );
    },
    () => true
);
