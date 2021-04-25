import { useCallback, useMemo, useState } from "react";

import { scrollTo } from "@utils/scroll-to";
import { thresholdArray } from "@utils/threshold-array";

const options = {
    rootMargin: "0px",
    threshold: thresholdArray(20),
};

/**
 * Use Timeline Within viewport
 */
export const useTimelineViewport = (): any => {
    const [activeItemId, setActiveItemId] = useState(
        (window.location.hash || "challenge").replace("#", "")
    );

    const pctInViewport = useMemo(() => ({} as Record<string, number>), []);

    const intersection: IntersectionObserverCallback = useCallback(
        ([{ intersectionRatio, target }]): void => {
            pctInViewport[target.id] = intersectionRatio;

            const selectedId = Object.keys(
                pctInViewport
            ).reduceRight((prev, curr) =>
                pctInViewport[prev] > pctInViewport[curr] ? prev : curr
            );

            setActiveItemId(selectedId);
        },
        [pctInViewport]
    );

    const onTimelineItemChange = useCallback(({ id }): void => {
        scrollTo("#" + id);
    }, []);

    return [activeItemId, intersection, options, onTimelineItemChange];
};
