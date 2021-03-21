import { forwardRef } from "react";

/**
 * Interfaces
 */
interface Props {
    id?: string;
    imgUrl: string;
    scale?: number;
}

/**
 * Apply distortion at particular image
 * @param props
 */
export const Distortion = forwardRef(
    // eslint-disable-next-line arrow-body-style
    ({ id = "", imgUrl = "", scale = 0, ...rest }: Props): JSX.Element => {
        return (
            <svg width="100%" height="100%" {...rest}>
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
