import { memo, useEffect } from "react";

import { motion, LayoutGroup, useAnimation } from "components/animation";
import { useStoreProp } from "store/index";

const overlayStyleClasses = "fixed left-0 right-0 w-full h-full";
const duration = 1;
const ease = [0.43, 0.13, 0.23, 0.96];

const transition = {
    duration,
    ease,
};

const backgroundColors = ["#F5A4FF", "#C0A4FF", "#61F1F8"];

const pageOverlayTopVariants = {
    initial: {
        height: "100vh",
        transition: { duration: 0 },
    },
    enter: {
        height: 0,
        transition,
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
        transition,
    },
};

const removeLocationHash = () => {
    const hasHash = window.location.href.indexOf("#") !== -1;

    if (hasHash) {
        window.location.replace(
            window.location.href.substring(0, window.location.href.indexOf("#"))
        );
    }
};

const scrollTo = (y: number = 0) => {
    window.scrollTo({
        top: y,
        left: 0,
        behavior: "auto",
    });
};

export const TopOverlay = () => (
    <motion.div
        className="relative bg-white z-100"
        initial="initial"
        animate="enter"
        exit="exit"
        onUpdate={() => {
            scrollTo();
        }}
        onAnimationStart={() => {
            removeLocationHash();
        }}
        onAnimationComplete={(variant) => {
            if (variant === "enter") {
                scrollTo(1);
            }
        }}
        variants={pageOverlayTopVariants}
    />
);

export const Overlays = memo(
    () => {
        const [currentDelayedRoute] = useStoreProp("currentDelayedRoute");
        const multiOverlays = !currentDelayedRoute;
        const animationControls = useAnimation();
        const motionProps = {
            className: overlayStyleClasses,
            initial: "end",
            animate: animationControls,
        };

        // Orchestrate animation when switching the route
        useEffect(() => {
            if (multiOverlays) {
                (async () => {
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

        return (
            <div id="overlays">
                <LayoutGroup>
                    <TopOverlay />

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
                                backgroundColor: backgroundColors[0],
                                zIndex: 1030,
                            }}
                            custom={{
                                id: 1,
                                duration,
                                ...OverlayVariants,
                            }}
                            variants={OverlayVariants}
                        />
                        <motion.div
                            {...motionProps}
                            style={{
                                backgroundColor: backgroundColors[1],
                                zIndex: 1020,
                            }}
                            custom={{
                                id: 2,
                                duration: duration * 0.66,
                                ...OverlayVariants,
                            }}
                        />
                        <motion.div
                            {...motionProps}
                            style={{
                                backgroundColor: backgroundColors[2],
                                zIndex: 1010,
                            }}
                            custom={{
                                id: 3,
                                duration: duration * 0.5,
                                ...OverlayVariants,
                            }}
                        />
                    </motion.div>
                </LayoutGroup>
            </div>
        );
    },
    () => true
);
