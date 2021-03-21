import { useRef, useEffect, RefObject } from "react";

type AllEvents = AnimationEvent
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
    element?: RefObject<T>
): void {
    const savedHandler = useRef<(event: AllEvents) => void>();

    useEffect(() => {
        const targetElement: T | Window = element?.current || window;

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

        targetElement.addEventListener(eventName, eventListener);

        return (): void => {
            targetElement.removeEventListener(eventName, eventListener);
        };
    }, [eventName, element, handler]);
}
