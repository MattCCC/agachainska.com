import { ReactNode } from "react";

import tw, { css, styled } from "twin.macro";

import { up } from "utils/screens";

interface Props {
    widthPct?: number;
    heightPct?: string;
    children: ReactNode;
}

export const FullPageContent = ({ cssStyles, children }: any) => (
    <figure
        style={cssStyles}
        // eslint-disable-next-line
        tw="w-full max-w-full overflow-hidden lg:relative lg:w-[var(--width-pct)vw] lg:h-[var(--height-pct)] lg:max-w-none mb-[40px] lg:left-1/2 lg:mt-0 lg:mr-auto lg:mb-[90px] lg:-ml-[(var(--width-pct)_/_2)vw]"
    >
        {children}
    </figure>
);

// export const FullPageContent = styled.figure(
//     ({ widthPct = 100, heightPct = "auto" }: Props) => [
//         tw`w-full max-w-full overflow-hidden`,
//         tw`lg:relative lg:w-[var(--width-pct)vw] lg:h-[var(--height-pct)] lg:max-w-none mb-[40px] lg:left-1/2`,
//         tw`lg:mt-0 lg:mr-auto lg:mb-[90px] lg:-ml-[var(--width-pct)_/_2vw]`,
//         css`
//             ${up("lg")} {
//                 // width: ${widthPct}vw;
//                 // height: ${heightPct};
//                 // margin: 0 auto 90px -${widthPct / 2}vw;
//             }
//         `,
//     ]
// );
