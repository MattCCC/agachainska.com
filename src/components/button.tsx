import { ButtonHTMLAttributes, FunctionComponent } from "react";

import tw, { styled } from "twin.macro";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const CustomButton = styled.button(() => [
    tw`px-6 py-2 border border-white border-solid`,
]);

export const Button: FunctionComponent<Props> = ({
    children,
    ...props
}: Props) => <CustomButton {...props}>{children}</CustomButton>;
