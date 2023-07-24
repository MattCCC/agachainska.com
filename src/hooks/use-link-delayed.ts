import { useCallback, useEffect, useRef } from "react";

import { NextRouter, useRouter } from "next/router";

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
    location?: NextRouter;
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
    const router = useRouter();

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
                return;
            }

            // If the link is an external link, open in new tab.
            if(goTo.includes("://")) {
                if (window !== undefined) {
                    window.open(goTo, "_blank");
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
                        router.replace(goTo);
                    } else {
                        router.push(goTo);
                    }

                    onDelayEnd(e, goTo);
                }, delay);
            }
        },
        [
            to,
            location?.pathname,
            delay,
            onDelayStart,
            replace,
            onDelayEnd,
            router,
        ]
    );

    return onClick;
};
