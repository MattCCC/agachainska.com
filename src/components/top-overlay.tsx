import { memo } from "react";
import { motion } from "framer-motion";

const duration = 1;
const ease = [0.43, 0.13, 0.23, 0.96];

const transition = {
    duration,
    ease,
};

const pageOverlayTopVariants = {
    initial: {
        height: "100vh",
        transition: { duration: 0 },
    },
    enter: {
        height: 0,
        transition,
    },
    exit: {
        height: 0,
        transition,
    },
};

const removeLocationHash = () => {
    const hasHash = window.location.href.indexOf("#") !== -1;

    if (hasHash) {
        window.location.replace(
            window.location.href.substring(
                0,
                window.location.href.indexOf("#"),
            ),
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

const TopOverlay = memo(() => (
    <motion.div
        className="relative bg-white z-100 will-change-[height]"
        initial="initial"
        animate="enter"
        exit="exit"
        onAnimationStart={() => {
            removeLocationHash();
        }}
        onAnimationComplete={(variant) => {
            if (variant === "enter") {
                scrollTo(1);
            }
        }}
        variants={pageOverlayTopVariants}
    />
));

export default TopOverlay;
