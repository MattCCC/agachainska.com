import { memo, useEffect } from "react";

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

const onAnimationStart = (variant: string) => {
    removeLocationHash();
    if (variant === "slideOverlaysAnimation") {
        document
            .getElementById("page-container")
            ?.classList.add("top-overlay-enter");
    }
};

const onAnimationComplete = (variant: string) => {
    if (variant === "topOverlayEnter") {
        scrollTo(1);
        const pageContainer = document.getElementById("page-container");

        if (pageContainer) {
            pageContainer.style.transform = "";
            pageContainer.classList.remove("top-overlay-enter");
        }
    }
};

const TopOverlay = memo(() => {
    useEffect(() => {
        const animationStartHandler = (event: AnimationEvent) => {
            onAnimationStart(event.animationName);
        };
        const animationCompleteHandler = (event: AnimationEvent) =>
            onAnimationComplete(event.animationName);

        document.addEventListener("animationstart", animationStartHandler);
        document.addEventListener("animationend", animationCompleteHandler);

        return () => {
            document.removeEventListener(
                "animationend",
                animationCompleteHandler
            );
        };
    }, []);

    return <div></div>;
});

export default TopOverlay;
