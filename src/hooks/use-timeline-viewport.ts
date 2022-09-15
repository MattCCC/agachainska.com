import { useCallback, useMemo, useState } from "react";

import { scrollTo } from "@utils/scroll-to";
import { thresholdArray } from "@utils/threshold-array";

const options: IntersectionObserverInit = {
    rootMargin: "0px",
    threshold: thresholdArray(2),
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
        (locationHash || "").replace("#", "")
    );

    const pctInViewport = useMemo(
        () => ({} as Record<string, Array<number | boolean>>),
        []
    );

    const pctViewPort = useMemo(
        () =>
            typeof window === "undefined"
                ? 1
                : (Number(window.innerWidth) * Number(window.innerHeight)) /
                  100,
        []
    );

    /**
     * This intersection callback considers multiple elements being observed
     */
    const intersection: IntersectionObserverCallback = useCallback(
        ([
            { intersectionRatio, isIntersecting, target, boundingClientRect },
        ]): void => {
            const pctViewportOverlapped =
                (boundingClientRect.width *
                    boundingClientRect.height *
                    intersectionRatio) /
                pctViewPort;

            pctInViewport[target.id] = [pctViewportOverlapped, isIntersecting];

            const selectedId = Object.keys(pctInViewport).reduceRight(
                (prev, curr) =>
                    pctInViewport[prev][0] >= pctInViewport[curr][0] &&
                    pctInViewport[prev][1]
                        ? prev
                        : curr
            );

            setActiveItemId(selectedId);
        },
        [pctInViewport, pctViewPort]
    );

    const onTimelineItemChange = useCallback(({ id }: any): void => {
        scrollTo("#" + id);
    }, []);

    return [activeItemId, intersection, options, onTimelineItemChange];
};
