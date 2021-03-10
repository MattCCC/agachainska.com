import {
    transition as overlayTransition,
    duration as overlayDuration,
} from "@components/overlays";

export const pageOverlayTopVariants = {
    exit: { y: 100, opacity: 0, transition: overlayTransition },
    enter: {
        y: 0,
        opacity: 1,
        transition: { delay: overlayDuration / 3, ...overlayTransition },
    },
};

export const pageContentVariants = {
    exit: { y: 100, opacity: 0, transition: overlayTransition },
    enter: {
        y: 0,
        opacity: 1,
        transition: {
            delay: overlayDuration / 1.5,
        },
    },
};
