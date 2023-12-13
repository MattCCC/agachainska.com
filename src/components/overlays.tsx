import { memo, useEffect } from "react";

import { useStoreProp } from "store/index";

const backgroundColors = ["#F5A4FF", "#C0A4FF", "#61F1F8"];

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

const onAnimationStart = (event: AnimationEvent) => {
    removeLocationHash();
    if (event.animationName === "slideOverlaysAnimation") {
        const pageContainer = document.getElementById("page-container");

        if (pageContainer) {
            pageContainer.classList.add("enter");
        }
    }
};

const initializeTopOverlay = (dispatch: {
    showInitialOverlayAnimation: (toggle: boolean) => void;
}) => {
    const pageContainer = document.getElementById("page-container");

    const onAnimationComplete = (event: TransitionEvent) => {
        const el = event?.target as HTMLElement;

        if (!el?.classList.contains("page-container")) {
            return;
        }

        scrollTo(1);

        if (pageContainer) {
            pageContainer.classList.add("end");
            pageContainer.classList.remove("enter");
            dispatch.showInitialOverlayAnimation(false);

            document.removeEventListener("animationstart", onAnimationStart);
            pageContainer.removeEventListener(
                "transitionend",
                onAnimationComplete
            );
        }
    };

    document.addEventListener("animationstart", onAnimationStart);

    if (pageContainer) {
        pageContainer.addEventListener("transitionend", onAnimationComplete);
    }
};

const Overlays = memo(() => {
    const [, dispatch] = useStoreProp("initialOverlayAnimation");

    useEffect(() => {
        initializeTopOverlay(dispatch);
    }, [dispatch]);

    return (
        <div id="overlays">
            <div
                className="fixed left-0 right-0 w-full h-full overlay"
                style={{
                    backgroundColor: backgroundColors[0],
                    zIndex: 1030,
                    animationDuration: 0.9 + "s",
                }}
            />
            <div
                className="fixed left-0 right-0 w-full h-full overlay"
                style={{
                    backgroundColor: backgroundColors[1],
                    zIndex: 1020,
                    animationDuration: 0.9 * 0.66 + "s",
                }}
            />
            <div
                className="fixed left-0 right-0 w-full h-full overlay"
                style={{
                    backgroundColor: backgroundColors[2],
                    zIndex: 1010,
                    animationDuration: 0.9 * 0.4 + "s",
                }}
            />
        </div>
    );
});

export default Overlays;
