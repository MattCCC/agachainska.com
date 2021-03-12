import { styled } from "twin.macro";
import { Link as TranslatedLink } from "gatsby-plugin-intl";
import { excludeProps } from "@utils/styled";
import {
    FunctionComponent,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
} from "react";
import { navigate } from "gatsby";
import { useLocation } from "@reach/router";

export { FormattedMessage as Translate } from "gatsby-plugin-intl";

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
export interface Props {
    to: string;
    children: ReactNode;
    replace?: boolean;
    delay?: 0;
    onDelayStart?: (e: Event, to: string) => null;
    onDelayEnd?: (e: Event, to: string) => null;
}

/**
 * Component
 * @param props
 */
export const Link: FunctionComponent<Props> = ({
    to,
    replace = false,
    delay = 0,
    onDelayStart = (): null => null,
    onDelayEnd = (): null => null,
    children,
    ...props
}: Props) => {
    const location = useLocation();
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

    return (
        <LinkStyled onClick={onClick} to={to} {...props}>
            {children}
        </LinkStyled>
    );
};
