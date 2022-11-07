import { ReactNode } from "react";

import tw, { css, styled } from "twin.macro";

import { up } from "utils/screens";

interface Props {
    widthPct?: number;
    heightPct?: string;
    border?: boolean;
    children: ReactNode;
}

export const FullPageContent = styled.figure(
    ({ widthPct = 100, heightPct = "80vh", border = true }: Props) => [
        tw`w-full max-w-full overflow-hidden`,
        border &&
            css`
                border: 1px solid #979797;
            `,
        css`
            margin-bottom: 40px;

            ${up("lg")} {
                ${tw`relative max-w-none`}

                width: ${widthPct}vw;
                height: min(560px, ${heightPct});
                margin: 0 auto 90px -${widthPct / 2}vw;
                left: calc(50% - 8px);
            }
        `,
    ]
);
