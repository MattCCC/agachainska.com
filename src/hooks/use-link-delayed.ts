import { useCallback, useEffect, useRef } from "react";

import { navigate } from "gatsby";

export type LinkDelayedCallback = (e: Event, to: string) => void;

export interface LinkDelayedArgs {
    to: string;
    location?: Location;
    replace?: boolean;
    delay?: number;
    onDelayStart?: LinkDelayedCallback;
    onDelayEnd?: LinkDelayedCallback;
}

/**
 * Delay hooks by X ms
 * @param {LinkDelayedArgs} payload     Options
 */
export const useLinkDelayed = ({
    to,
    location,
    replace = false,
    delay = 0,
    onDelayStart = ((_e, _to) => {}) as LinkDelayedCallback,
    onDelayEnd = ((_e, _to) => {}) as LinkDelayedCallback,
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
