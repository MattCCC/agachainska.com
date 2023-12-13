import { memo, useEffect } from "react";

import TopOverlay from "components/top-overlay";
import { useStoreProp } from "store/index";

const backgroundColors = ["#F5A4FF", "#C0A4FF", "#61F1F8"];

const overlayAnimation = {
    animationDuration: "1s",
    animationTimingFunction: "cubic-bezier(0.43, 0.13, 0.23, 0.96)",
    animationFillMode: "forwards",
    animationName: "slideOverlaysAnimation",
    animationDelay: "0s",
};

const Overlays = memo(() => {
    const [, dispatch] = useStoreProp("initialOverlayAnimation");

    useEffect(() => {
        const overlays = document.querySelectorAll(".overlay");

        if (!overlays[0]) {
            return;
        }

        overlays[0].addEventListener("animationend", () => {
            dispatch.showInitialOverlayAnimation(false);
        });
    }, [dispatch]);

    return (
        <div id="overlays">
            <TopOverlay />

            <div
                className="fixed left-0 right-0 w-full h-full overlay"
                style={{
                    backgroundColor: backgroundColors[0],
                    zIndex: 1030,
                    ...overlayAnimation,
                }}
            />
            <div
                className="fixed left-0 right-0 w-full h-full overlay"
                style={{
                    backgroundColor: backgroundColors[1],
                    zIndex: 1020,
                    ...overlayAnimation,
                    animationDuration: "0.66s",
                }}
            />
            <div
                className="fixed left-0 right-0 w-full h-full overlay"
                style={{
                    backgroundColor: backgroundColors[2],
                    zIndex: 1010,
                    ...overlayAnimation,
                    animationDuration: "0.4s",
                }}
            />
        </div>
    );
});

export default Overlays;
