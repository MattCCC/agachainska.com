import { FunctionComponent, ReactNode } from "react";

import { Link as TranslatedLink } from "gatsby-plugin-intl";
import { styled } from "twin.macro";

import { useNavigate } from "@hooks/use-delay-link";
import { LinkDelayedArgs, OnDelayCallback } from "@hooks/use-link-delayed";
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
 */
export const Link: FunctionComponent<Props> = ({
    to,
    replace = false,
    delay = 0,
    onDelayStart = ((_e, _to) => {}) as OnDelayCallback,
    onDelayEnd = ((_e, _to) => {}) as OnDelayCallback,
    children,
    ...props
}: Props) => {
    const onClick = useNavigate({
        to,
        replace,
        delay,
        onDelayStart,
        onDelayEnd,
    });

    return (
        <LinkStyled onClick={onClick} to={to} {...props}>
            {children}
        </LinkStyled>
    );
};
