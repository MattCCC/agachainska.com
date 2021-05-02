import tw, { css, styled } from "twin.macro";

import { up } from "@utils/screens";

export const H3 = styled.h3(() => [
    tw`font-fbold`,
    css`
        font-size: 24px;
        line-height: 24px;
        padding: 0 0 16px;

        ${up("lg")} {
            padding: 0 0 24px;
        }
    `,
]);
