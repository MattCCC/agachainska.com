import { useRouter } from "next/router";

import { fullPageOverlayDurationMs } from "components/full-page-overlay";
import {
    LinkDelayedArgs,
    LinkDelayedCallback,
    OnDelayCallback,
    useLinkDelayed,
} from "hooks/use-link-delayed";
import { useStoreProp } from "store/index";

export interface DelayedLink extends LinkDelayedArgs {
    to: string;
}

export const useNavigation = ({
    to,
    replace = false,
    onDelayStart = (() => {}) as OnDelayCallback,
    onDelayEnd = (() => {}) as OnDelayCallback,
}: DelayedLink): LinkDelayedCallback => {
    const location = useRouter();
    const [, { setCurrentDelayedRoute }] = useStoreProp("currentDelayedRoute");
    const [, { showMotionCursor }] = useStoreProp("motionCursorData");

    const startDelay: OnDelayCallback = (e, toRoute) => {
        setCurrentDelayedRoute(toRoute);
        showMotionCursor(false);
        onDelayStart(e, toRoute);
    };

    const endDelay: OnDelayCallback = (e, toRoute) => {
        setCurrentDelayedRoute("");
        onDelayEnd(e, toRoute);
    };

    return useLinkDelayed({
        location,
        to,
        delay: fullPageOverlayDurationMs,
        replace,
        onDelayStart: startDelay,
        onDelayEnd: endDelay,
    });
};
