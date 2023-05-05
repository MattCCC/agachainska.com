import { useCallback, useMemo, useState } from "react";

import { scrollTo } from "utils/scroll-to";
import { thresholdArray } from "utils/threshold-array";

const options: IntersectionObserverInit = {
    rootMargin: "0px",
    threshold: thresholdArray(2),
};

/**
 * Use Timeline Viewport
 * It creates an intersection callback that considers multiple elements
 * being observed and chooses one that is most visible on the screen
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

    const pctInViewport = useMemo<Record<string, [number, boolean]>>(
        () => ({}),
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

    const intersection: IntersectionObserverCallback = useCallback(
        ([
            {
                intersectionRatio,
                isIntersecting,
                target,
                boundingClientRect,
            } = {
                isIntersecting: false,
                intersectionRatio: 1,
                target: null,
                boundingClientRect: null,
            },
        ]): void => {
            if (!target || !boundingClientRect) {
                return;
            }

            const pctViewportOverlapped =
                (boundingClientRect.width *
                    boundingClientRect.height *
                    intersectionRatio) /
                pctViewPort;

            pctInViewport[target.id] = [pctViewportOverlapped, isIntersecting];

            const selectedId = Object.keys(pctInViewport).reduceRight(
                (prev, curr) => {
                    if (!pctInViewport) {
                        return curr;
                    }

                    const prevPct = pctInViewport[prev];
                    const currPct = pctInViewport[curr];

                    return prevPct &&
                        currPct &&
                        prevPct[1] &&
                        prevPct[0] >= currPct[0]
                        ? prev
                        : curr;
                }
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
