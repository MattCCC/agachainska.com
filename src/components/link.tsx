import { FunctionComponent, ReactNode } from "react";

import { Link as TranslatedLink } from "gatsby-plugin-intl";
import { styled } from "twin.macro";

import { fullPageOverlayDuration } from "@components/full-page-overlay";
import {
    LinkDelayedArgs,
    LinkDelayedCallback,
    useDelayLink,
} from "@hooks/link-delayed";
import { useLocation } from "@reach/router";
import { useStore } from "@store/index";
import { excludeProps } from "@utils/styled";


/**
 * Styles
 */
const LinkStyled = styled(
    TranslatedLink,
    excludeProps(["isCurrentPage"])
)(() => []);

/**
 * Interfaces
 */
export interface Props extends LinkDelayedArgs {
    to: string;
    children: ReactNode;
}

/**
 * Component
 * @param props
 */
export const Link: FunctionComponent<Props> = ({
    to,
    replace = false,
    delay = 0,
    onDelayStart = ((_e, _to) => {}) as LinkDelayedCallback,
    onDelayEnd = ((_e, _to) => {}) as LinkDelayedCallback,
    children,
    ...props
}: Props) => {
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

    return (
        <LinkStyled onClick={onClick} to={to} {...props}>
            {children}
        </LinkStyled>
    );
};
