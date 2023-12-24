import { memo, useCallback, useEffect, useRef, useState } from "react";

import { useStoreProp } from "store/index";
import { Router } from "next/router";

export const fullPageOverlayDurationMs = 600;

export const FullPageOverlay = memo(() => {
    const [initialOverlayAnimation] = useStoreProp("initialOverlayAnimation");
    const [currentDelayedRoute] = useStoreProp("currentDelayedRoute");
    const [isLoading, setIsLoading] = useState(false);
    const [isSchedulerReady, setIsSchedulerReady] = useState(false);
    const [isRouteChanged, setIsRouteChanged] = useState(false);
    const timeout = useRef<NodeJS.Timeout | null>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

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
    }, [end]);

    // Orchestrate animation at the beginning of the transition
    useEffect(() => {
        if (!isLoading) {
            return;
        }

        setTimeout(async () => {
            if (overlayRef.current) {
                overlayRef.current.style.display = "block";

                document.body.style.overflow = "hidden";

                setTimeout(() => {
                    if (overlayRef.current) {
                        overlayRef.current.classList.add("enter");
                    }
                }, 0);
            }
        }, 0);
    }, [isLoading]);

    // Orchestrate animation at the end of the transition
    // Animation should be orchestrated only when time passes & route is changed
    useEffect(() => {
        if (!isSchedulerReady || !isRouteChanged) {
            return;
        }

        if (timeout?.current) {
            clearTimeout(timeout.current);
        }

        setTimeout(() => {
            if (overlayRef.current) {
                overlayRef.current.classList.add("end");
                document.body.style.overflow = "visible";

                setTimeout(() => {
                    if (overlayRef.current) {
                        overlayRef.current.style.display = "none";
                        setIsLoading(false);
                        overlayRef.current.classList.remove("enter", "end");
                    }
                }, fullPageOverlayDurationMs);
            }
        }, 0);
    }, [isSchedulerReady, isRouteChanged]);

    // Don't render full page overlay when navigating initially
    if (initialOverlayAnimation) {
        return null;
    }

    return (
        <div
            ref={overlayRef}
            className={"full-page-overlay fixed left-0 w-full h-full"}
        ></div>
    );
});
