import { FunctionComponent } from "react";
import { ReactNode } from "react";

import tw, { css, styled } from "twin.macro";

import { up } from "@utils/screens";

interface Props {
    widthPct?: number;
    children: ReactNode;
}

export const FullPageImgWrapper = styled.figure(({ widthPct = 100 }: Props) => [
    tw`overflow-hidden w-full max-w-full`,
    css`
        border: 1px solid #979797;
        margin-bottom: 40px;

        ${up("lg")} {
            max-width: none;
            width: ${widthPct}vw;
            height: 80vh;
            position: relative;
            margin: 0 auto 90px -${widthPct / 2}vw;
            left: calc(50% - 8px);
        }
    `,
]);

export const FullPageImage: FunctionComponent<Props> = ({
    widthPct = 100,
    children,
    ...props
}) => (
    <FullPageImgWrapper widthPct={widthPct} {...props}>
        {children}
    </FullPageImgWrapper>
);
