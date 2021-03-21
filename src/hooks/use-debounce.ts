import { useCallback } from "react";
import { debounce } from "lodash-es";

export const useDebounce = (fnToDebounce: any, durationInMs: number = 200): any => useCallback(debounce(fnToDebounce, durationInMs), [fnToDebounce, durationInMs]);
