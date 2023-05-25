import { ReactNode } from "react";

import tw, { css, styled } from "twin.macro";

import { up } from "utils/screens";

interface Props {
    widthPct?: number;
    heightPct?: string;
    border?: boolean;
    children: ReactNode;
}

const scrollbarWidth = 3;

export const FullPageContent = styled.figure(
    ({ widthPct = 100, heightPct = "auto", border = true }: Props) => [
        tw`w-full max-w-full overflow-hidden`,
        border &&
            css`
                border: 1px solid #979797;
            `,
        tw`lg:relative lg:max-w-none mb-[40px] lg:left-1/2`,
        css`
            ${up("lg")} {
                width: ${widthPct}vw;
                height: ${heightPct};
                margin: 0 auto 90px -${widthPct / 2}vw;
            }
        `,
    ]
);
