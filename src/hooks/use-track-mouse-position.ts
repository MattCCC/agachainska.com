import { useEffect, useMemo, useState } from "react";

interface MousePosition {
    clientX: number;
    clientY: number;
}

export const useTrackMousePosition = (): MousePosition => {
    const defaultState = useMemo(() => ({ clientX: 0, clientY: 0 }), []);
    const [position, setPosition] = useState(defaultState);

    useEffect(() => {
        const setMousePosition = (pos: MousePosition): void => {
            setPosition(() => pos);
        };

        window.addEventListener("mousemove", setMousePosition);

        return (): void => {
            window.removeEventListener("mousemove", setMousePosition);
        };
    }, [defaultState, setPosition]);

    return position;
};
