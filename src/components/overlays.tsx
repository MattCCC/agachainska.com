import {
    motion,
    AnimateSharedLayout,
    useAnimation,
} from "@components/animation";
import { getRandomNumber } from "@utils/random-number";
import { Fragment, memo, useEffect, useState } from "react";
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
export const fullPageOverlayDuration = 1;

export const transition = {
    duration,
    ease: [0.43, 0.13, 0.23, 0.96],
};

export const backgroundColors = [["#F5A4FF", "#C0A4FF", "#61F1F8"]];

export const fullPageOverlayColor = "#000";

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

const OverlayFullPageVariants = {
    initial: {
        top: "100%",
        transition: { ...transition, duration: 0 },
        display: "none",
    },
    enter: {
        display: "block",
        top: "0%",
        transition: { ...transition, duration: fullPageOverlayDuration },
    },
    end: {
        display: "block",
        top: "-100%",
        transition: { ...transition, duration: fullPageOverlayDuration },
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

        const overlayControls = useAnimation();

        // Orchestrate animation when switching the route
        useEffect(() => {
            if (state.currentDelayedRoute) {
                overlayControls.start((variant) => variant.initial);

                setTimeout(() => {
                    overlayControls.start((variant) => variant.enter);
                }, 50);

                setTimeout(() => {
                    overlayControls.start((variant) => variant.end);
                }, fullPageOverlayDuration * 1000);
            }
        }, [overlayControls, state.currentDelayedRoute]);

        return (
            <Fragment>
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
                <motion.div
                    key="fullPageOverlay"
                    className="fixed left-0 w-full h-full"
                    custom={OverlayFullPageVariants}
                    animate={overlayControls}
                    initial="initial"
                    style={{
                        backgroundColor: fullPageOverlayColor,
                        zIndex: 1040,
                    }}
                    variants={OverlayFullPageVariants}
                />
            </Fragment>
        );
    },
    () => true
);
