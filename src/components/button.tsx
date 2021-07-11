import { ButtonHTMLAttributes, FunctionComponent } from "react";

import tw, { css, styled } from "twin.macro";

import { ReactComponent as BgShape } from "@svg/Rectangle@1x.svg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const CustomButton = styled.button(() => [
    tw`relative select-none bg-tertiary-color`,
    css`
        span {
            ${tw`relative z-10 block w-full h-full border border-white border-solid bg-tertiary-color`}

            padding-left: 25px;
            padding-right: 25px;
            padding-top: 5px;
            padding-bottom: 5px;
        }

        &:hover {
            svg {
                ${tw`opacity-0`}
            }

            span {
                ${tw`transition-all bg-primary-color text-tertiary-color`}
            }
        }
    `,
]);

const Background = styled(BgShape)(() => [
    tw`absolute z-0`,
    css`
        width: 100%;
        height: 100%;
        left: 6px;
        top: 6px;
    `,
]);

export const Button: FunctionComponent<Props> = ({
    children,
    ...props
}: Props) => (
    <CustomButton {...props}>
        <Background />
        <span>{children}</span>
    </CustomButton>
);
