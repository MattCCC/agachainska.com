import { css, styled } from "twin.macro";

import { up } from "@utils/screens";

/**
 * Styles
 */
export const Quote = styled.div(() => [
    css`
        color: #828282;
        font-family: "Larsseit-Bold";
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
