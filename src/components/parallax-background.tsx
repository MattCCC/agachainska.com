import { FunctionComponent } from "react";

import tw, { css, styled } from "twin.macro";

import { up } from "@utils/screens";

interface Props {
    bgImgUrl: string;
    contain?: boolean;
}

export const Background = styled.div(({ bgImgUrl, contain = false }: Props) => [
    tw`h-full w-full`,
    css`
        background-image: url("${bgImgUrl}");
        background-repeat: no-repeat;
        background-color: rgba(255, 255, 255, 0.8);
        background-size: contain;
        transition: transform 500ms cubic-bezier(0, 0.55, 0.45, 1);

        ${up("lg")} {
            background-attachment: fixed;
            transform: translateZ(0);
            -webkit-backface-visibility: inherit;
            -webkit-font-smoothing: antialiased;
        }

        &:hover {
            transform: scale(1.1);
        }
    `,
    !contain &&
        css`
            ${up("lg")} {
                background-size: cover;
            }
        `,
]);

export const BackgroundWrapper = styled.div(() => [
    tw`overflow-hidden h-full w-full max-w-full`,
]);

export const ParallaxBackground: FunctionComponent<Props> = (props: Props) => (
    <BackgroundWrapper>
        <Background {...props} />
    </BackgroundWrapper>
);
