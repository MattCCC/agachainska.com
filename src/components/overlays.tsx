import { memo } from "react";

import { motion, LayoutGroup } from "components/animation";
import TopOverlay from "components/top-overlay";
import { useStoreProp } from "store/index";

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
            duration: variant["duration"],
        },
    }),
};

const Overlays = memo(
    () => {
        const [initialOverlayAnimation, dispatch] = useStoreProp(
            "initialOverlayAnimation"
        );

        // Don't render overlays when navigating subsequently
        if (!initialOverlayAnimation) {
            return null;
        }

        return (
            <div id="overlays">
                <LayoutGroup id="overlays">
                    <TopOverlay />

                    <motion.div
                        className="fixed left-0 right-0 w-full h-full will-change-transform"
                        style={{
                            backgroundColor: backgroundColors[0],
                            zIndex: 1030,
                        }}
                        custom={{
                            id: 1,
                            duration,
                        }}
                        onAnimationComplete={() => {
                            dispatch.showInitialOverlayAnimation(false);
                        }}
                        variants={OverlayVariants}
                        animate="enter"
                        initial="end"
                        exit="end"
                    />
                    <motion.div
                        className="fixed left-0 right-0 w-full h-full will-change-transform"
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
                        className="fixed left-0 right-0 w-full h-full will-change-transform"
                        style={{
                            backgroundColor: backgroundColors[2],
                            zIndex: 1010,
                        }}
                        custom={{
                            id: 3,
                            duration: duration * 0.4,
                        }}
                        variants={OverlayVariants}
                        animate="enter"
                        initial="end"
                        exit="end"
                    />
                </LayoutGroup>
            </div>
        );
    },
    () => true
);

export default Overlays;
