import { ButtonHTMLAttributes, PropsWithChildren } from "react";

import tw, { css, styled } from "twin.macro";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const CustomButton = styled.button(() => [
    tw`relative transition-[top,left] ease-in left-0 top-0 select-none bg-tertiary`,
    tw`lg:hover:top-[3px] lg:hover:left-[3px] duration-100`,
    css`
        span {
            ${tw`relative z-10 inline-block w-full h-full border border-white border-solid bg-tertiary`}

            padding-left: 25px;
            padding-right: 25px;
            padding-top: 5px;
            padding-bottom: 5px;
        }

        @media screen and (min-width: 1024px) {
            &:hover {
                span {
                    ${tw`transition-all bg-primary text-tertiary`}
                }

                div {
                    top: 0px;
                    left: 0px;
                }
            }
        }
    `,
]);

const Background = styled.div(() => [
    tw`absolute w-full h-full bg-[url("/img/button-bg.png")] bg-no-repeat bg-cover top-[6px] left-[6px] z-0 border border-black duration-100`,
]);

export const Button = ({ children, ...props }: PropsWithChildren<Props>) => (
    <CustomButton {...props}>
        <Background />
        <span>{children}</span>
    </CustomButton>
);
