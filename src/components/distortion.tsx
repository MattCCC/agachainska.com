import { memo, useEffect, useState, useRef } from "react";
import { convertTinaUrl } from "utils/convert-tina-url";
import { fetchCachedImage } from "utils/fetch-cached-image";

/**
 * Apply distortion to a provided image
 */
export const Distortion = memo(
    ({
        id = "",
        imgUrl = "",
        scale = 0,
        className = "",
    }: {
        id?: string;
        imgUrl: string;
        className?: string;
        scale?: number;
    }) => {
        const cachedImgData = useRef({ blob: "" });
        const [, setIsImgCached] = useState(false);

        useEffect(() => {
            async function fetchData() {
                cachedImgData.current = await fetchCachedImage(
                    convertTinaUrl(imgUrl)
                );

                setIsImgCached(true);
            }

            fetchData();
        }, [imgUrl]);

        if (!cachedImgData.current) {
            return null;
        }

        return (
            <svg width="100%" height="100%" className={className}>
                <defs>
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
                </defs>
                <g filter={`url(#distortion${id})`}>
                    <image
                        xlinkHref={cachedImgData.current.blob}
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
