import { useRef, useEffect, RefObject } from "react";

interface EventMap {
    animation: AnimationEvent;
    clipboard: ClipboardEvent;
    composition: CompositionEvent;
    drag: DragEvent;
    focus: FocusEvent;
    keyboard: KeyboardEvent;
    mouse: MouseEvent;
    touch: TouchEvent;
    pointer: PointerEvent;
    transition: TransitionEvent;
    ui: UIEvent;
    wheel: WheelEvent;
}

type GlobalEventHandlersEventMapKeys = keyof GlobalEventHandlersEventMap;

type RemainingEventMapKeys<T> = Exclude<
    GlobalEventHandlersEventMapKeys,
    keyof T
>;

type RemainingEvents = {
    [K in RemainingEventMapKeys<EventMap>]: Event;
};

export interface EventMapExtended extends EventMap, RemainingEvents {}

export function useEventListener<T extends keyof EventMapExtended>(
    eventName: T,
    handler: (event: EventMapExtended[T]) => void,
    element?: RefObject<HTMLElement> | HTMLElement,
    options?: boolean | AddEventListenerOptions | undefined
): void {
    const savedHandler = useRef<(event: EventMapExtended[T]) => void>();

    useEffect(() => {
        const targetElement =
            (element as RefObject<HTMLElement>)?.current || window;

        if (!(targetElement && targetElement.addEventListener)) {
            return;
        }

        if (savedHandler.current !== handler) {
            savedHandler.current = handler;
        }

        const eventListener: EventListener = (event: Event) => {
            if (!!savedHandler?.current) {
                // Type assertion to cast the event to the specific type
                savedHandler.current(event as EventMapExtended[T]);
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
