import { MutableRefObject, useEffect, useRef, useState } from "react";

import { useInView } from "framer-motion";

/**
 * Increment stats animation
 */
export const useIncrementStats = (): [MutableRefObject<null>, boolean] => {
    const [animateStats, setAnimateStats] = useState(false);
    const refStats = useRef(null);
    const isVisible = useInView(refStats);

    useEffect(() => {
        setAnimateStats(isVisible);
    }, [isVisible]);

    return [refStats, animateStats];
};
