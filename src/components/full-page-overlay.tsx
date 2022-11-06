import { memo, useEffect } from "react";

import { motion, useAnimation } from "components/animation";
import { useStore } from "store/index";

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

export const FullPageOverlay = memo(
    () => {
        const [state] = useStore();
        const overlayControls = useAnimation();

        // Orchestrate animation when switching the route
        useEffect(() => {
            if (state.currentDelayedRoute) {
                (async (): Promise<void> => {
                    document.body.style.overflow = "hidden";

                    await overlayControls.start((variant) => variant.initial);
                    await overlayControls.start((variant) => variant.enter);

                    setTimeout(async () => {
                        await overlayControls.start((variant) => variant.end);
                        document.body.style.overflow = "visible";
                    }, fullPageOverlayDuration * 1000);
                })();
            }
        }, [overlayControls, state.currentDelayedRoute]);

        return (
            <motion.div
                className="fixed left-0 w-full h-full"
                key="fullPageOverlay"
                variants={OverlayFullPageVariants}
                custom={OverlayFullPageVariants}
                animate={overlayControls}
                initial="initial"
                style={{
                    backgroundColor: fullPageOverlayColor,
                    zIndex: 1040,
                }}
            />
        );
    },
    () => true
);
