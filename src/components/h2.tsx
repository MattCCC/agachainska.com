import tw, { css, styled } from "twin.macro";

import { up } from "@utils/screens";

export const H2 = styled.h2(() => [
    tw`uppercase`,
    css`
        font-size: 30px;
        font-family: "Larsseit-Bold";
        line-height: 40px;
        padding: 0 0 5px;
        margin: 40px 0 32px;
        border-bottom: 1px solid var(--primary-color);

        ${up("lg")} {
            font-size: 54px;
            line-height: 100px;
            padding-bottom: 20px;
            border-bottom-width: 2px;
            margin: 80px 0 40px;
        }
    `,
]);
