import { useRef, useEffect, RefObject } from "react";

type AllEvents =
    | AnimationEvent
    | ClipboardEvent
    | CompositionEvent
    | DragEvent
    | FocusEvent
    | KeyboardEvent
    | MouseEvent
    | TouchEvent
    | PointerEvent
    | TransitionEvent
    | UIEvent
    | WheelEvent
    | Event;

export function useEventListener<T extends HTMLElement = HTMLDivElement>(
    eventName: string,
    handler: (event: AllEvents) => void,
    element?: RefObject<T> | HTMLElement,
    options?: boolean | AddEventListenerOptions | undefined
): void {
    const savedHandler = useRef<(event: AllEvents) => void>();

    useEffect(() => {
        const targetElement =
            (element as RefObject<HTMLElement>)?.current || window;

        if (!(targetElement && targetElement.addEventListener)) {
            return;
        }

        if (savedHandler.current !== handler) {
            savedHandler.current = handler;
        }

        const eventListener = (event: AllEvents): void => {
            if (!!savedHandler?.current) {
                savedHandler.current(event);
            }
        };

        targetElement.addEventListener(eventName, eventListener, options);

        return (): void => {
            targetElement.removeEventListener(
                eventName,
                eventListener,
                options
            );
        };
    }, [eventName, element, handler, options]);
}
