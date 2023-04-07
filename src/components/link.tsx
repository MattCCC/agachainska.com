import { MouseEvent, PropsWithChildren, ReactNode } from "react";

import { useTranslation } from "next-i18next";

import NextLink, { LinkProps } from "next/link";

import { LinkDelayedArgs, OnDelayCallback } from "hooks/use-link-delayed";
import { useNavigation } from "hooks/use-navigation";

export interface Props extends LinkDelayedArgs, Omit<LinkProps, "href"> {
    to: string;
    children: ReactNode;
    isCurrentPage?: boolean;
}

export const Link = ({
    to = "",
    replace = false,
    delay = 0,
    onDelayStart = (() => {}) as OnDelayCallback,
    onDelayEnd = (() => {}) as OnDelayCallback,
    children,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isCurrentPage = false,
    ...props
}: PropsWithChildren<Props>) => {
    const { i18n } = useTranslation();
    const onClick = useNavigation({
        to,
        replace,
        delay,
        onDelayStart,
        onDelayEnd,
    });

    return (
        <NextLink
            onClick={(e: MouseEvent<HTMLAnchorElement | HTMLDivElement>) =>
                onClick(e)
            }
            href={to}
            locale={i18n.language}
            {...props}
        >
            {children}
        </NextLink>
    );
};
