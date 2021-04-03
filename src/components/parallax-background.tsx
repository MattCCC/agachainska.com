import { FunctionComponent } from "react";

import tw, { css, styled } from "twin.macro";

import { up } from "@utils/screens";

interface Props {
    bgImgUrl: string;
    contain?: boolean;
    scaleOnHover?: boolean;
}

export const Background = styled.div(
    ({ bgImgUrl, contain = false, scaleOnHover = false }: Props) => [
        tw`h-full w-full`,
        css`
            background-image: url("${bgImgUrl}");
            background-repeat: no-repeat;
            background-color: rgba(255, 255, 255, 0.8);
            background-size: contain;
            transition: transform 500ms cubic-bezier(0, 0.55, 0.45, 1);
            background-position: center;

            ${up("lg")} {
                background-attachment: fixed;
                transform: translateZ(0);
                backface-visibility: inherit;
                -webkit-font-smoothing: antialiased;
                background-size: 100% 100%;
            }
        `,
        !contain &&
            css`
                ${up("lg")} {
                    background-size: cover;
                }
            `,
        scaleOnHover &&
            css`
                ${up("lg")} {
                    &:hover {
                        transform: scale(1.1);
                    }
                }
            `,
    ]
);

export const BackgroundWrapper = styled.div(() => [
    tw`overflow-hidden h-full w-full max-w-full`,
]);

export const ParallaxBackground: FunctionComponent<Props> = (props: Props) => (
    <BackgroundWrapper>
        <Background {...props} />
    </BackgroundWrapper>
);
