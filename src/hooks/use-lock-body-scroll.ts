import { useEffect } from "react";

export const useLockBodyScroll = (): void => {
    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;

        document.body.style.overflow = "hidden";

        return (): void => {
            document.body.style.overflow = originalStyle;
        };
    }, []);
};
