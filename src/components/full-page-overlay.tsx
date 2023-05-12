import { memo, useCallback, useEffect, useRef, useState } from "react";

import { motion, useAnimation } from "components/animation";
import { useStoreProp } from "store/index";
import { Router } from "next/router";

export const duration = 1;
export const fullPageOverlayDurationMs = 600;

export const transition = {
    duration,
    ease: [0.43, 0.13, 0.23, 0.96],
};

export const fullPageOverlayColor = "#000";

const OverlayFullPageVariants = {
    initial: {
        y: "100%",
        transition: { ...transition, duration: 0 },
        display: "none",
    },
    enter: {
        display: "block",
        y: "0%",
        transition: {
            ...transition,
            duration: fullPageOverlayDurationMs / 1000,
        },
    },
    end: {
        display: "block",
        y: "-100%",
        transition: {
            ...transition,
            duration: fullPageOverlayDurationMs / 1000,
        },
    },
};

export const FullPageOverlay = memo(
    () => {
        const [initialOverlayAnimation] = useStoreProp(
            "initialOverlayAnimation"
        );
        const [currentDelayedRoute] = useStoreProp("currentDelayedRoute");
        const overlayControls = useAnimation();
        const [isLoading, setIsLoading] = useState(false);
        const [isSchedulerReady, setIsSchedulerReady] = useState(false);
        const [isRouteChanged, setIsRouteChanged] = useState(false);
        const timeout = useRef<NodeJS.Timeout | null>(null);

        const start = useCallback(() => {
            setIsLoading(true);
            setIsSchedulerReady(false);
            setIsRouteChanged(false);

            if (timeout?.current) {
                clearTimeout(timeout.current);
            }

            timeout.current = setTimeout(() => {
                setIsSchedulerReady(true);
            }, fullPageOverlayDurationMs);
        }, []);

        const end = useCallback(() => {
            setIsRouteChanged(true);
        }, []);

        // Use delayed route as it's faster than routeChangeStart
        useEffect(() => {
            if (currentDelayedRoute) {
                start();
            }
        }, [currentDelayedRoute, start]);

        // Detect route change completion
        useEffect(() => {
            Router.events.on("routeChangeComplete", end);
            Router.events.on("routeChangeError", end);

            return () => {
                Router.events.off("routeChangeComplete", end);
                Router.events.off("routeChangeError", end);
            };
        }, []);

        // Orchestrate animation at the beginning of the transition
        useEffect(() => {
            if (!isLoading) {
                return;
            }

            setTimeout(async () => {
                document.body.style.overflow = "hidden";

                await overlayControls.start((variant) => variant.initial);
                await overlayControls.start((variant) => variant.enter);
            }, 0);
        }, [isLoading, overlayControls]);

        // Orchestrate animation at the end of the transition
        // Animation should be orchestrated only when time passes & route is changed
        useEffect(() => {
            if (!isSchedulerReady || !isRouteChanged) {
                return;
            }

            if (timeout?.current) {
                clearTimeout(timeout.current);
            }

            setTimeout(async () => {
                await overlayControls.start((variant) => variant.end);
                document.body.style.overflow = "visible";
                setIsLoading(false);
            }, 0);
        }, [isSchedulerReady, isRouteChanged, overlayControls]);

        // Don't render full page overlay when navigating initially
        if (initialOverlayAnimation) {
            return null;
        }

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
