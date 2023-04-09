import { memo } from "react";

import { motion, LayoutGroup } from "components/animation";
import { useStoreProp } from "store/index";
import TopOverlay from "components/top-overlay";

const duration = 1;

const transition = {
    duration,
    ease: [0.43, 0.13, 0.23, 0.96],
};

const backgroundColors = ["#F5A4FF", "#C0A4FF", "#61F1F8"];

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

const OverlayVariants = {
    end: {
        y: "100%",
        transition,
    },
    enter: (variant: Record<string, unknown>) => ({
        y: "-100%",
        transition: {
            ...transition,
            duration: variant.duration,
        },
    }),
};

const Overlays = memo(
    () => {
        const [currentDelayedRoute] = useStoreProp("currentDelayedRoute");

        // Don't render overlays when navigating subsequently
        if (currentDelayedRoute) {
            return null;
        }

        return (
            <LayoutGroup id="overlays">
                <TopOverlay />

                <motion.div
                    className="fixed left-0 right-0 w-full h-full"
                    style={{
                        backgroundColor: backgroundColors[0],
                        zIndex: 1030,
                    }}
                    custom={{
                        id: 1,
                        duration,
                    }}
                    variants={OverlayVariants}
                    animate="enter"
                    initial="end"
                    exit="end"
                />
                <motion.div
                    className="fixed left-0 right-0 w-full h-full"
                    style={{
                        backgroundColor: backgroundColors[1],
                        zIndex: 1020,
                    }}
                    custom={{
                        id: 2,
                        duration: duration * 0.66,
                    }}
                    variants={OverlayVariants}
                    animate="enter"
                    initial="end"
                    exit="end"
                />
                <motion.div
                    className="fixed left-0 right-0 w-full h-full"
                    style={{
                        backgroundColor: backgroundColors[2],
                        zIndex: 1010,
                    }}
                    custom={{
                        id: 3,
                        duration: duration * 0.5,
                    }}
                    variants={OverlayVariants}
                    animate="enter"
                    initial="end"
                    exit="end"
                />
            </LayoutGroup>
        );
    },
    () => true
);

export default Overlays;
