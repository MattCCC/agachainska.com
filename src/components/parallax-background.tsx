import tw, { css, styled } from "twin.macro";

import Image from "next/image";
import { useRef } from "react";

interface Props {
    bgImgUrl: string;
    width: number;
    contain?: boolean;
}

export const Background = styled.div(() => [
    tw`w-full h-full`,
    tw`[transition:transform_500ms_cubic-bezier(0, 0.55, 0.45, 1)]`,
    tw`lg:transform-none lg:[backface-visibility:inherit] lg:object-cover lg:w-full lg:max-w-[--width] lg:h-full`,
]);

export const BackgroundWrapper = styled.div(() => [
    tw`w-full h-full max-w-full overflow-hidden`,
    css`
        clip-path: inset(0);
    `,
]);

export const ParallaxBackground = ({ bgImgUrl, width }: Props) => {
    const imgRef = useRef<HTMLImageElement>(null);

    return (
        <BackgroundWrapper>
            <Background
                ref={imgRef}
                style={{ "--width": width } as React.CSSProperties}
            >
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
