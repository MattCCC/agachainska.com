import tw, { css, styled } from "twin.macro";

export const H4 = styled.h4(() => [
    tw`font-fbold`,
    css`
        height: 40px;
        font-size: 30px;
        line-height: 40px;
    `,
]);
