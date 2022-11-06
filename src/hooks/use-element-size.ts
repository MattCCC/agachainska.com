import { RefObject, useState, useEffect, useCallback } from "react";

import { useEventListener } from "hooks/use-event-listener";

interface Size {
    width: number;
    height: number;
}

export function useElementSize<T extends HTMLElement = HTMLDivElement>(
    elementRef: RefObject<T>
): Size {
    const [size, setSize] = useState<Size>({
        width: 0,
        height: 0,
    });

    const updateSize = useCallback(() => {
        const node = elementRef?.current;

        if (node) {
            setSize({
                width: node.offsetWidth || 0,
                height: node.offsetHeight || 0,
            });
        }
    }, [elementRef]);

    useEffect((): void => {
        updateSize();
    }, [updateSize]);

    useEventListener("resize", updateSize);

    return size;
}
