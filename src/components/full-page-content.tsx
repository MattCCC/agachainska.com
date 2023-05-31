import { ReactNode } from "react";

import tw, { css, styled } from "twin.macro";

import { up } from "utils/screens";

interface CSSStyle {
    "--width-pct": number | string;
    "--height-pct"?: number | string;
    "--margin-left-value"?: number | string;
}

interface Props {
    cssStyles: CSSStyle;
    children: ReactNode;
}

export const FullPageContent = ({ cssStyles, children }: Props) => (
    <figure
        style={{
            ...cssStyles,
            "--width-pct": cssStyles["--width-pct"] + "vw",
            "--height-pct": cssStyles["--height-pct"] || "auto",
            "--margin-left-value": cssStyles["--width-pct"] / 2 + "vw",
        }}
        // eslint-disable-next-line
        tw="w-full max-w-full overflow-hidden lg:relative lg:w-[--width-pct] lg:h-[--height-pct] lg:max-w-none mb-[40px] lg:left-1/2 lg:mt-0 lg:mr-auto lg:mb-[90px] lg:-ml-[--margin-left-value]"
    >
        {children}
    </figure>
);
