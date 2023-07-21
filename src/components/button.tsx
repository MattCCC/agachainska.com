import { ButtonHTMLAttributes, PropsWithChildren } from "react";

import tw, { css, styled } from "twin.macro";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const CustomButton = styled.button(() => [
    tw`relative transition-[top,left] ease-in left-0 top-0 select-none bg-tertiary`,
    tw`lg:hover:top-[3px] lg:hover:left-[3px] lg:hover:text-tertiary duration-100`,
    css`
        @media screen and (min-width: 1024px) {
            &:hover {
                div {
                    top: 0px;
                    left: 0px;
                }
            }
        }
    `,
]);

const CustomButtonText = styled.span(() => [
    tw`relative z-10 inline-block w-full h-full border border-white border-solid bg-tertiary`,
    tw`px-[25px] py-[5px] lg:hover:transition-all lg:hover:bg-primary lg:hover:text-tertiary`,
]);

const Background = styled.div(() => [
    tw`absolute w-full h-full bg-[url("/img/button-bg.png")] bg-no-repeat bg-cover top-[6px] left-[6px] z-0 border border-black duration-100`,
    tw`lg:hover:top-0 lg:hover:left-0`,
]);

export const Button = ({ children, ...props }: PropsWithChildren<Props>) => (
    <CustomButton {...props}>
        <Background />
        <CustomButtonText>{children}</CustomButtonText>
    </CustomButton>
);
