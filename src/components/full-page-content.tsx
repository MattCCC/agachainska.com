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
    ({ widthPct = 100, heightPct = "auto", border = true }: Props) => [
        tw`w-full max-w-full mb-[40px] overflow-hidden`,
        tw`lg:relative lg:max-w-none lg:mt-0 lg:mr-auto lg:mb-[90px]`,
        border &&
            css`
                border: 1px solid #979797;
            `,
        // css`
        //     ${up("lg")} {
        //         ${tw`relative max-w-none`}

        //         width: ${widthPct}vw;
        //         height: ${heightPct};
        //         margin: 0 auto 90px -${widthPct / 2}vw;
        //         left: 50%;
        //     }
        // `,
    ]
);
