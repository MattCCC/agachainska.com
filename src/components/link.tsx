import { FunctionComponent, ReactNode } from "react";

import { Link as TranslatedLink } from "gatsby-plugin-intl";
import { styled } from "twin.macro";

import {
    LinkDelayedArgs,
    LinkDelayedCallback,
} from "@hooks/link-delayed";
import { useDelayedLink } from "@hooks/use-delay-link";
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
    onDelayStart = ((_e, _to) => { }) as LinkDelayedCallback,
    onDelayEnd = ((_e, _to) => { }) as LinkDelayedCallback,
    children,
    ...props
}: Props) => {
    const { onClick } = useDelayedLink({
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
