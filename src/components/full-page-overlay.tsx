import { motion, useAnimation } from "@components/animation";
import { memo, useEffect } from "react";
import { useStore } from "@store/index";

/**
 * Configs
 */
export const duration = 1;
export const fullPageOverlayDuration = 0.6;

export const transition = {
    duration,
    ease: [0.43, 0.13, 0.23, 0.96],
};

export const fullPageOverlayColor = "#000";

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
export const FullPageOverlay = memo(
    (): JSX.Element => {
        const [state] = useStore();
        const overlayControls = useAnimation();

        // Orchestrate animation when switching the route
        useEffect(() => {
            if (state.currentDelayedRoute) {
                (async (): Promise<void> => {
                    await overlayControls.start((variant) => variant.initial);
                    await overlayControls.start((variant) => variant.enter);

                    setTimeout(() => {
                        overlayControls.start((variant) => variant.end);
                    }, fullPageOverlayDuration * 1000);
                })();
            }
        }, [overlayControls, state.currentDelayedRoute]);

        return (
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
        );
    },
    () => true
);
