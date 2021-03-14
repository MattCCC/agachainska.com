import { styled } from "twin.macro";
import { Link as TranslatedLink } from "gatsby-plugin-intl";
import { excludeProps } from "@utils/styled";
import { FunctionComponent, ReactNode } from "react";
import { useLocation } from "@reach/router";
import { LinkDelayedArgs, useDelayLink } from "@hooks/link-delayed";

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
    onDelayStart = (): null => null,
    onDelayEnd = (): null => null,
    children,
    ...props
}: Props) => {
    const location = useLocation();
    const onClick = useDelayLink({
        location,
        to,
        onDelayStart,
        delay,
        replace,
        onDelayEnd,
    });

    return (
        <LinkStyled onClick={onClick} to={to} {...props}>
            {children}
        </LinkStyled>
    );
};
