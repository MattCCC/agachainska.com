import { MouseEvent, PropsWithChildren, ReactNode } from "react";

// import { Link as TranslatedLink } from "gatsby-plugin-intl";
import { styled } from "twin.macro";

import TranslatedLink from "next/link";

import { LinkDelayedArgs, OnDelayCallback } from "hooks/use-link-delayed";
import { useNavigation } from "hooks/use-navigation";
import { excludeProps } from "utils/styled";

export interface Props extends LinkDelayedArgs {
    to: string;
    children: ReactNode;
}

const LinkStyled = styled(
    TranslatedLink,
    excludeProps(["isCurrentPage"])
)(() => []);

export const Link = ({
    to,
    replace = false,
    delay = 0,
    onDelayStart = (() => {}) as OnDelayCallback,
    onDelayEnd = (() => {}) as OnDelayCallback,
    children,
    ...props
}: PropsWithChildren<Props>) => {
    const onClick = useNavigation({
        to,
        replace,
        delay,
        onDelayStart,
        onDelayEnd,
    });

    return (
        <LinkStyled onClick={(e: MouseEvent<HTMLAnchorElement | HTMLDivElement>) => onClick(e)} href={to} {...props}>
            {children}
        </LinkStyled>
    );
};
