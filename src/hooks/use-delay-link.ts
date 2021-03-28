import { fullPageOverlayDuration } from "@components/full-page-overlay";
import {
    LinkDelayedArgs,
    LinkDelayedCallback,
    useDelayLink,
} from "@hooks/link-delayed";
import { useLocation } from "@reach/router";
import { useStore } from "@store/index";
/**
 * Interfaces
 */
export interface DelayedLink extends LinkDelayedArgs {
    to: string;
}

export interface DelayedLinkHook {
    onClick: ((e: any) => void);
}

/**
 * Component
 * @param props
 */
export const useDelayedLink = ({
    to,
    replace = false,
    onDelayStart = ((_e, _to) => {}) as LinkDelayedCallback,
    onDelayEnd = ((_e, _to) => {}) as LinkDelayedCallback,
}: DelayedLink): DelayedLinkHook => {
    const location = useLocation();
    const [, dispatch] = useStore();

    const startDelay = (e: Event, toRoute: string): void => {
        dispatch.setCurrentDelayedRoute(toRoute);
        dispatch.showMotionCursor(false);
        onDelayStart(e, toRoute);
    };

    const endDelay = (e: Event, toRoute: string): void => {
        dispatch.setCurrentDelayedRoute("");
        dispatch.showMotionGrid(true);
        dispatch.showWavePattern(true);
        onDelayEnd(e, toRoute);
    };

    const onClick = useDelayLink({
        location,
        to,
        delay: fullPageOverlayDuration * 1000 * 1.1,
        replace,
        onDelayStart: startDelay,
        onDelayEnd: endDelay,
    });

    return {
        onClick,
    };
};
