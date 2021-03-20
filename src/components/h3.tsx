import { up } from "@utils/screens";
import { css, styled } from "twin.macro";

/**
 * Styles
 */

export const H3 = styled.h3(() => [
    css`
        font-size: 24px;
        font-family: "Larsseit-Bold";
        line-height: 24px;
        padding: 0 0 16px;

        ${up("lg")} {
            padding: 0 0 24px;
        }
    `,
]);
