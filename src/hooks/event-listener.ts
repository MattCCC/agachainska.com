import { useRef, useEffect, RefObject } from "react";

export function useEventListener<T extends HTMLElement = HTMLDivElement>(
    eventName: string,
    handler: (event: Event) => void,
    element?: RefObject<T>
): void {
    const savedHandler = useRef<(event: Event) => void>();

    useEffect(() => {
        const targetElement: T | Window = element?.current || window;

        if (!(targetElement && targetElement.addEventListener)) {
            return;
        }

        if (savedHandler.current !== handler) {
            savedHandler.current = handler;
        }

        const eventListener = (event: Event): void => {
            if (!!savedHandler?.current) {
                savedHandler.current(event);
            }
        };

        targetElement.addEventListener(eventName, eventListener);

        return (): void => {
            targetElement.removeEventListener(eventName, eventListener);
        };
    }, [eventName, element, handler]);
}
