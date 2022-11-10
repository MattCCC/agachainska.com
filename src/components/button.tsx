import { ButtonHTMLAttributes, PropsWithChildren } from "react";

import tw, { css, styled } from "twin.macro";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const CustomButton = styled.button(() => [
    tw`relative select-none bg-tertiary`,
    css`
        span {
            ${tw`relative z-10 inline-block w-full h-full border border-white border-solid bg-tertiary`}

            padding-left: 25px;
            padding-right: 25px;
            padding-top: 5px;
            padding-bottom: 5px;
        }

        &:hover {
            div {
                ${tw`opacity-0`}
            }

            span {
                ${tw`transition-all bg-primary text-tertiary`}
            }
        }
    `,
]);

const Background = styled.div(() => [
    tw`absolute z-0 border border-black`,
    css`
        background: url("/img/button-bg.png") no-repeat;
        background-size: cover;
        width: 100%;
        height: 100%;
        left: 6px;
        top: 6px;
    `,
]);

export const Button = ({ children, ...props }: PropsWithChildren<Props>) => (
    <CustomButton {...props}>
        <Background />
        <span>{children}</span>
    </CustomButton>
);
