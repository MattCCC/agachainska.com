import tw, { css, styled } from "twin.macro";

import { up } from "utils/screens";
import Image from "next/image";
import { useRef } from "react";

interface Props {
    bgImgUrl: string;
    width: number;
    contain?: boolean;
}

export const Background = styled.div(({ width = 0 }: Partial<Props>) => [
    tw`w-full h-full`,
    css`
        transition: transform 500ms cubic-bezier(0, 0.55, 0.45, 1);

        ${up("lg")} {
            transform: none;
            backface-visibility: inherit;
            object-fit: cover;
            width: 100%;
            max-width: ${width}px;
            height: 100%;
        }
    `,
]);

export const BackgroundWrapper = styled.div(() => [
    tw`w-full h-full max-w-full overflow-hidden`,
    css`
        clip-path: inset(0);
    `,
]);

export const ParallaxBackground = ({ bgImgUrl, contain, width }: Props) => {
    const imgRef = useRef<HTMLImageElement>(null);

    return (
        <BackgroundWrapper>
            <Background ref={imgRef} contain={contain} width={width}>
                <Image
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        position: "relative",
                    }}
                    ref={imgRef}
                    src={bgImgUrl}
                    height={546}
                    width={width}
                    alt={""}
                />
            </Background>
        </BackgroundWrapper>
    );
};

export default ParallaxBackground;
