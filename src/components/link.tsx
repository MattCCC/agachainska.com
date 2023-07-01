import { MouseEvent, PropsWithChildren, ReactNode, memo } from "react";

import { useTranslation } from "hooks/use-translation";

import NextLink, { LinkProps } from "next/link";

import { LinkDelayedArgs, OnDelayCallback } from "hooks/use-link-delayed";
import { useNavigation } from "hooks/use-navigation";

export interface Props extends LinkDelayedArgs, Omit<LinkProps, "href"> {
    to: string;
    children: ReactNode;
    className?: string;
}

export const Link = memo(
    ({
        to = "",
        replace = false,
        delay = 0,
        onDelayStart = (() => {}) as OnDelayCallback,
        onDelayEnd = (() => {}) as OnDelayCallback,
        children,
        className = "",
    }: PropsWithChildren<Props>) => {
        const { locale } = useTranslation();
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
                locale={locale}
                className={className}
            >
                {children}
            </NextLink>
        );
    }
);
