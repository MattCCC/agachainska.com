import { useRef, useEffect } from "react";

/**
 * Example: ref={el => itemsRef.current[i] = el}
 * @param {*} items
 * @returns {MutableRefObject<never[]>} itemsRef
 */
export const useRefArray = (
    items: any,
): any => {
    const itemsRef = useRef<Array<HTMLDivElement | null>>([]);

    useEffect(() => {
        itemsRef.current = itemsRef.current.slice(0, items.length);
    }, [items]);

    return itemsRef;
};
