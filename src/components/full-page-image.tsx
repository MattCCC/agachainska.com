import { FunctionComponent } from "react";
import { ReactNode } from "react";

import { Parallax } from "react-scroll-parallax";
import tw, { css, styled } from "twin.macro";

import { up } from "@utils/screens";

interface Props {
    children: ReactNode;
}

export const FullPageImgWrapper = styled.figure(() => [
    tw`overflow-hidden w-full max-w-full`,
    css`
        border: 1px solid #979797;
        margin-bottom: 40px;

        ${up("lg")} {
            max-width: none;
            width: 100vw;
            position: relative;
            height: auto;
            margin: 0 auto 90px -50vw;
            left: calc(50% - 8px);
        }
    `,
]);

export const FullPageImage: FunctionComponent<Props> = ({
    children,
    ...props
}) => (
    <FullPageImgWrapper {...props}>
        <Parallax y={[-50, 50]}>{children}</Parallax>
    </FullPageImgWrapper>
);
