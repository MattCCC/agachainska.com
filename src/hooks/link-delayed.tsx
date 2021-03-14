import { useCallback, useEffect, useRef } from "react";
import { navigate } from "gatsby";

export interface LinkDelayedArgs {
    to: string;
    location: Location;
    replace?: boolean;
    delay?: number;
    onDelayStart?: (e: Event, to: string) => null;
    onDelayEnd?: (e: Event, to: string) => null;
}

/**
 * Delay hooks by X ms
 * @param {LinkDelayedArgs} payload     Options
 */
export const useDelayLink = ({
    to,
    location,
    replace = false,
    delay = 0,
    onDelayStart = (): null => null,
    onDelayEnd = (): null => null,
}: LinkDelayedArgs): ((e: any) => void) => {
    const timeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(
        () => (): void => {
            if (timeout?.current) {
                clearTimeout(timeout.current);
            }
        },
        [timeout]
    );

    const onClick = useCallback(
        (e): void => {
            // If trying to navigate to current page stop everything
            if (location?.pathname === to) {
                return;
            }

            if (delay) {
                onDelayStart(e, to);

                if (e.defaultPrevented) {
                    return;
                }

                e.preventDefault();

                timeout.current = setTimeout(() => {
                    if (replace) {
                        navigate(to, { replace: true });
                    } else {
                        navigate(to);
                    }

                    onDelayEnd(e, to);
                }, delay);
            }
        },
        [location, to, onDelayStart, delay, replace, onDelayEnd]
    );

    return onClick;
};
