import tw, { css, styled } from "twin.macro";

import { up } from "@utils/screens";

export const Quote = styled.blockquote(() => [
    tw`font-fbold`,
    css`
        color: #828282;
        font-size: 28px;
        line-height: 34px;
        margin-bottom: 57px;

        ${up("lg")} {
            font-size: 48px;
            line-height: 56px;
            margin-bottom: 140px;
        }
    `,
]);
