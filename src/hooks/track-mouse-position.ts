import { useEffect, useState } from "react";

export const TrackMousePosition = () => {
    const defaultState = { clientX: 0, clientY: 0 };
    const [position, setPosition] = useState(defaultState);

    useEffect(() => {
        const setMousePosition = (e: typeof defaultState) => {
            return setPosition({
                clientX: e.clientX,
                clientY: e.clientY,
            });
        };

        window.addEventListener("mousemove", setMousePosition);

        return () => {
            window.removeEventListener("mousemove", setMousePosition);
        };
    }, [defaultState]);

    return position;
};
