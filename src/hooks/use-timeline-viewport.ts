import { useCallback, useMemo, useState } from "react";

import { scrollTo } from "@utils/scroll-to";

const options: IntersectionObserverInit = {
    rootMargin: "0px",
    threshold: 0,
};

/**
 * Use Timeline Within viewport
 */
export const useTimelineViewport = (): [
    string,
    IntersectionObserverCallback,
    IntersectionObserverInit,
    ((item: unknown) => void) | undefined
] => {
    const locationHash = typeof window !== "undefined" && window.location.hash;

    const [activeItemId, setActiveItemId] = useState(
        (locationHash || "challenge").replace("#", "")
    );

    const pctInViewport = useMemo(() => ({} as Record<string, number>), []);

    const intersection: IntersectionObserverCallback = useCallback(
        ([{ intersectionRatio, target }]): void => {
            pctInViewport[target.id] = intersectionRatio;

            const selectedId = Object.keys(pctInViewport).reduceRight(
                (prev, curr) =>
                    pctInViewport[prev] > pctInViewport[curr] ? prev : curr
            );

            setActiveItemId(selectedId);
        },
        [pctInViewport]
    );

    const onTimelineItemChange = useCallback(({ id }: any): void => {
        scrollTo("#" + id);
    }, []);

    return [activeItemId, intersection, options, onTimelineItemChange];
};
