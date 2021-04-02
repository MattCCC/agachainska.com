import { memo, useEffect, useState } from "react";

import {
    motion,
    AnimateSharedLayout,
    useAnimation,
} from "@components/animation";
import { useStore } from "@store/index";

const overlayStyleClasses = "fixed left-0 w-full h-full";

export const duration = 1;

export const transition = {
    duration,
    ease: [0.43, 0.13, 0.23, 0.96],
};

export const backgroundColors = ["#F5A4FF", "#C0A4FF", "#61F1F8"];

export const pageOverlayTopVariants = {
    initial: {
        height: "100vh",
        transition: { ...transition, duration: 0 },
    },
    enter: {
        height: 0,
        transition: { ...transition, delay: 0.3 },
    },
    exit: {
        height: 0,
        transition,
    },
};

export const pageContentVariants = {
    exit: {
        y: 100,
        opacity: 0,
        transition,
    },
    enter: {
        y: 0,
        opacity: 1,
        transition: {
            duration,
            delay: duration,
        },
    },
};

const ContainerVariants = {
    end: {
        opacity: 1,
        display: "none",
        transition: {
            when: "beforeChildren",
        },
    },
    enter: {
        opacity: 1,
        display: "block",
        transition: {
            duration: 0,
            staggerChildren: 0.5,
        },
    },
};

const OverlayVariants = {
    end: { y: "100%", transition },
    enter: {
        y: "-100%",
        transition: { ...transition, duration },
    },
};

const removeLocationHash = () => {
    const hasHash = window.location.href.indexOf("#") !== -1;

    if (hasHash) {
        window.location.replace(
            window.location.href.substr(0, window.location.href.indexOf("#"))
        );
    }
};

const setScrollBehaviour = (
    scrollBehavior: CSSStyleDeclaration["scrollBehavior"]
) => {
    const mainFrame = document.querySelector("html");

    if (mainFrame) {
        mainFrame.style.scrollBehavior = scrollBehavior;
    }
};

export const TopOverlay = (): JSX.Element => (
    <motion.div
        initial="initial"
        animate="enter"
        exit="exit"
        onUpdate={() => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "auto",
            });
        }}
        onAnimationStart={() => {
            setScrollBehaviour("auto");
            removeLocationHash();
        }}
        onAnimationComplete={(variant) => {
            if (variant === "enter") {
                setScrollBehaviour("smooth");
            }
        }}
        variants={pageOverlayTopVariants}
    />
);

export const Overlays = memo(
    (): JSX.Element => {
        const [state] = useStore();
        const [palette, setPalette] = useState([] as string[]);
        const multiOverlays = !state.currentDelayedRoute;
        const animationControls = useAnimation();
        const motionProps = {
            className: overlayStyleClasses,
            initial: "end",
            animate: animationControls,
        };

        // Orchestrate animation when switching the route
        useEffect(() => {
            if (multiOverlays) {
                (async (): Promise<void> => {
                    await animationControls.start((variant) => {
                        if (variant.duration) {
                            variant.enter.transition.duration =
                                variant.duration;
                        }

                        return variant.enter;
                    });

                    await animationControls.start((variant) => variant.end);
                })();
            }
        }, [animationControls, multiOverlays]);

        // Multiple background colors
        useEffect(() => {
            setPalette(backgroundColors);
        }, [setPalette]);

        return (
            <AnimateSharedLayout>
                <motion.div
                    layout
                    className={overlayStyleClasses}
                    style={{
                        zIndex: 1000,
                    }}
                    custom={ContainerVariants}
                    animate={animationControls}
                    initial="end"
                >
                    <motion.div
                        {...motionProps}
                        style={{
                            backgroundColor: palette[0],
                            zIndex: 1030,
                        }}
                        custom={{
                            id: 1,
                            ...OverlayVariants,
                        }}
                    />
                    <motion.div
                        {...motionProps}
                        style={{
                            backgroundColor: palette[1],
                            zIndex: 1020,
                        }}
                        custom={{
                            id: 2,
                            duration: duration / 2,
                            ...OverlayVariants,
                        }}
                    />
                    <motion.div
                        {...motionProps}
                        style={{
                            backgroundColor: palette[2],
                            zIndex: 1010,
                        }}
                        custom={{
                            id: 3,
                            duration: duration / 3,
                            ...OverlayVariants,
                        }}
                    />
                </motion.div>
            </AnimateSharedLayout>
        );
    },
    () => true
);
