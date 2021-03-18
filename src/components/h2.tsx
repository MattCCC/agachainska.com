import tw, { css, styled } from "twin.macro";

/**
 * Styles
 */

export const H2 = styled.h2(() => [
    tw`uppercase`,
    css`
        font-size: 54px;
        font-family: "Larsseit-Bold";
        line-height: 100px;
        padding: 80px 0 20px;
        border-bottom: 2px solid var(--primary-color);
    `,
]);
