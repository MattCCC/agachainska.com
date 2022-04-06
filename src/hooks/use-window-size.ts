import { useState, useEffect } from "react";

export const useWindowSize = () => {
    const getSize = () => ({
        width: (typeof window !== "undefined" && window.innerWidth) || 0,
        height: (typeof window !== "undefined" && window.innerHeight) || 0,
    });

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(getSize());
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
};
