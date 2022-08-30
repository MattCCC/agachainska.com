import { useLocation } from "@reach/router";

import { fullPageOverlayDuration } from "@components/full-page-overlay";
import {
    LinkDelayedArgs,
    LinkDelayedCallback,
    OnDelayCallback,
    useLinkDelayed,
} from "@hooks/use-link-delayed";
import { useStore } from "@store/index";

export interface DelayedLink extends LinkDelayedArgs {
    to: string;
}

export const useNavigation = ({
    to,
    replace = false,
    onDelayStart = ((_e, _to) => {}) as OnDelayCallback,
    onDelayEnd = ((_e, _to) => {}) as OnDelayCallback,
}: DelayedLink): LinkDelayedCallback => {
    const location = useLocation();
    const [, dispatch] = useStore();

    const startDelay: OnDelayCallback = (e, toRoute) => {
        dispatch.setCurrentDelayedRoute(toRoute);
        dispatch.showMotionCursor(false);
        onDelayStart(e, toRoute);
    };

    const endDelay: OnDelayCallback = (e, toRoute) => {
        dispatch.setCurrentDelayedRoute("");
        onDelayEnd(e, toRoute);
    };

    return useLinkDelayed({
        location,
        to,
        delay: fullPageOverlayDuration * 1000 * 1.1,
        replace,
        onDelayStart: startDelay,
        onDelayEnd: endDelay,
    });
};
