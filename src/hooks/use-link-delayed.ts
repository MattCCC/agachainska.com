import { useCallback, useEffect, useRef } from "react";

import { navigate } from "gatsby";

import { isDev } from "utils/detect-env";

export type LinkDelayedCallback = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>,
    to?: string
) => void;

export type OnDelayCallback = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>,
    to: string
) => void;

export interface LinkDelayedArgs {
    to: string;
    location?: Location;
    replace?: boolean;
    delay?: number;
    onDelayStart?: OnDelayCallback;
    onDelayEnd?: OnDelayCallback;
}

/**
 * Delay redirection by X ms
 */
export const useLinkDelayed = ({
    to,
    location,
    replace = false,
    delay = 0,
    onDelayStart = (() => {}) as OnDelayCallback,
    onDelayEnd = (() => {}) as OnDelayCallback,
}: LinkDelayedArgs): LinkDelayedCallback => {
    const timeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(
        () => (): void => {
            if (timeout?.current) {
                clearTimeout(timeout.current);
            }
        },
        [timeout]
    );

    const onClick: LinkDelayedCallback = useCallback(
        (e, toRoute = "") => {
            const goTo = toRoute || to;

            // If trying to navigate to current page stop everything
            if (location?.pathname === goTo) {
                if (isDev()) {
                    // eslint-disable-next-line no-console
                    console.warn("Trying to navigate to the same location.");
                }

                return;
            }

            if (delay) {
                onDelayStart(e, goTo);

                if (e.defaultPrevented) {
                    return;
                }

                e.preventDefault();

                timeout.current = setTimeout(() => {
                    if (replace) {
                        navigate(goTo, { replace: true });
                    } else {
                        navigate(goTo);
                    }

                    onDelayEnd(e, goTo);
                }, delay);
            }
        },
        [location, to, onDelayStart, delay, replace, onDelayEnd]
    );

    return onClick;
};
