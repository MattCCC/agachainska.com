import { FunctionComponent } from "react";
import { ReactNode } from "react";

import { Parallax } from "react-scroll-parallax";
import tw, { css, styled } from "twin.macro";

import { up } from "@utils/screens";

/**
 * Styles
 */
export const FullPageImgWrapper = styled.figure(() => [
    tw`overflow-hidden`,
    css`
        max-width: 100%;
        width: 100%;
        border: 1px solid #979797;
        margin-bottom: 40px;

        ${up("lg")} {
            max-width: none;
            width: 100vw;
            position: relative;
            overflow: hidden;
            height: auto;
            margin: 0 auto 90px -50vw;
            left: calc(50% - 8px);
        }
    `,
]);

/**
 * Interfaces
 */
interface Props {
    children: ReactNode;
}

/**
 * Component
 */
export const FullPageImage: FunctionComponent<Props> = ({
    children,
    ...props
}) => (
    <FullPageImgWrapper {...props}>
        <Parallax y={[-50, 50]}>{children}</Parallax>
    </FullPageImgWrapper>
);
