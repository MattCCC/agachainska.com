import { memo, useMemo } from "react";

/**
 * Apply distortion to a provided image
 */
export const Distortion = memo(
    ({
        id = "",
        imgUrl = "",
        scale = 0,
        ...rest
    }: {
        id?: string;
        imgUrl: string;
        scale?: number;
    }) => {
        const restProps = useMemo(
            () =>
                Object.fromEntries(
                    Object.entries(rest).filter(
                        ([key]) => !key.includes("layoutId")
                    )
                ),
            [rest]
        );

        return (
            <svg width="100%" height="100%" {...restProps}>
                <filter id={`distortion${id}`}>
                    <feTurbulence
                        type="turbulence"
                        baseFrequency="0.01 0.01"
                        numOctaves="4"
                        seed="2"
                        stitchTiles="stitch"
                        x="0%"
                        y="0%"
                        width="100%"
                        height="100%"
                        result="noise"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale={scale}
                        xChannelSelector="B"
                        yChannelSelector="G"
                        x="0%"
                        y="0%"
                        width="100%"
                        height="100%"
                        filterUnits="userSpaceOnUse"
                    />
                </filter>
                <g filter={`url(#distortion${id})`}>
                    <image
                        xlinkHref={imgUrl}
                        x="0"
                        y="0"
                        height="100%"
                        width="100%"
                        preserveAspectRatio="xMidYMid slice"
                    />
                </g>
            </svg>
        );
    }
);
