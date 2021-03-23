import { useCallback } from "react";

import { throttle } from "lodash-es";

export const useThrottle = (fnToThrottle: any, durationInMs: number = 200): any => useCallback(() => throttle(fnToThrottle, durationInMs), [fnToThrottle, durationInMs]);
