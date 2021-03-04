import { RefObject, useEffect, useState } from "react";

export const trackMousePosition = (
    elementRef: RefObject<HTMLHeadingElement>
) => {
    const defaultState = { x: 0, y: 0, clientX: 0, clientY: 0 };
    const [position, setPosition] = useState(defaultState);

    useEffect(() => {
        const setMousePosition = (e: typeof defaultState) => {
            const clientRect = (elementRef.current as HTMLHeadingElement).getBoundingClientRect();

            return setPosition({
                clientX: e.clientX,
                clientY: e.clientY,
                x: e.clientX - clientRect.left,
                y: e.clientY - clientRect.top,
            });
        };

        window.addEventListener("mousemove", setMousePosition);

        return () => {
            window.removeEventListener("mousemove", setMousePosition);
        };
    }, []);

    return position;
};
