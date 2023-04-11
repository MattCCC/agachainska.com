import { MutableRefObject, useRef } from "react";

import { useInView } from "framer-motion";

/**
 * Increment stats animation
 */
export const useIncrementStats = (): [MutableRefObject<null>, boolean] => {
    const refStats = useRef(null);
    const isVisible = useInView(refStats);

    return [refStats, isVisible];
};
