import tw, { css, styled } from "twin.macro";

/**
 * Styles
 */
export const Circle = styled.div(() => [
    tw`text-white text-center uppercase rounded-full select-none`,
    css`
        width: 80px;
        height: 80px;
        background-color: var(--black-color);
        border: 1px solid var(--black-color);
        transform: translate(-50%, -50%);
        font-size: 12px;
        padding: 24px 22px;
        cursor: none;

        a {
            cursor: none;
        }
    `,
]);
