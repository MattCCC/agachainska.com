import { useEffect, useState } from "react";

import { useInView } from "react-hook-inview";

/**
 * Increment stats animation
 */
export const useIncrementStats = (): [
    (node: Element | null) => void,
    boolean
] => {
    const [animateStats, setAnimateStats] = useState(false);
    const [refStats, isVisible] = useInView();

    useEffect(() => {
        setAnimateStats(isVisible);
    }, [isVisible]);

    return [refStats, animateStats];
};
