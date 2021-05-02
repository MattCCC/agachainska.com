import tw, { css, styled } from "twin.macro";

export const Circle = styled.div(() => [
    tw`text-center text-white uppercase bg-black border border-black border-solid rounded-full select-none`,
    css`
        width: 80px;
        height: 80px;
        transform: translate(-50%, -50%);
        font-size: 12px;
        padding: 24px 22px;
    `,
]);
