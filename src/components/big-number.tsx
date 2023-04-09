import { CSSProperties, SVGProps, useEffect, useMemo, useState } from "react";

import useInterval from "@use-it/interval";

interface Props extends SVGProps<SVGSVGElement> {
    id: string;
    value: number | string;
    animate?: boolean;
    displayOnRight?: boolean;
    viewBox?: string;
    preserveAspectRatio?: string;
    style?: CSSProperties;
}

function SvgWrapper({
    viewBox,
    preserveAspectRatio,
    style,
    svgId,
    children,
    ...props
}: Partial<Props> & { svgId: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox={viewBox}
            preserveAspectRatio={preserveAspectRatio}
            style={style}
            {...props}
        >
            <defs>
                <pattern
                    id={"pattern-" + svgId}
                    width="787.894"
                    height="787.894"
                    x="-779.765"
                    y="-787.894"
                    patternUnits="userSpaceOnUse"
                >
                    <use
                        transform="scale(1.53886)"
                        xlinkHref={"#shade-" + svgId}
                    ></use>
                </pattern>
                <image
                    id={"shade-" + svgId}
                    width="512"
                    height="512"
                    xlinkHref={"/img/bg-pattern.webp"}
                ></image>
            </defs>
            <g
                fill="none"
                fillRule="nonzero"
                stroke="none"
                strokeWidth="1"
                fontFamily="Larsseit-Bold, Larsseit"
                fontSize="180"
                fontWeight="bold"
                letterSpacing="7.714"
            >
                {children}
            </g>
        </svg>
    );
}

export function BigNumber({
    id = "0",
    value = 1,
    animate = false,
    displayOnRight = false,
    viewBox = "0 0 213 200",
    preserveAspectRatio = "xMidYMid",
    style = {},
    ...props
}: Props) {
    const [count, setCount] = useState("0");
    const [delay, setDelay] = useState<null | number>(null);
    const viewBoxWidth = useMemo(
        () => Number(viewBox.split(" ")[2]),
        [viewBox]
    );

    useEffect(() => {
        if (animate) {
            setCount(Number(value) > 0 ? "1" : "0");
            setDelay(1000 / Number(value || 1));
        } else {
            setCount(() => String(value));
        }
    }, [animate, value]);

    useInterval(() => {
        if (!animate) {
            return;
        }

        const num = Number(count);

        if (num === value) {
            setDelay(null);
        } else {
            setCount(() => String(num + 1));
        }
    }, delay);

    let x = 0;
    let textAnchor = "start";

    if (displayOnRight) {
        x = viewBoxWidth - 5;
        textAnchor = "end";
    }

    return (
        <SvgWrapper
            viewBox={viewBox}
            preserveAspectRatio={preserveAspectRatio}
            svgId={id}
            style={style}
            {...props}
        >
            <text
                fill={`url(#pattern-${id})`}
                stroke="#000"
                strokeWidth="1.5"
                textAnchor={textAnchor}
            >
                <tspan x={x + 8.129} y="179">
                    {count}
                </tspan>
            </text>
            <text
                fill="#FFF"
                stroke="#0B0B0B"
                strokeWidth="1.5"
                textAnchor={textAnchor}
            >
                <tspan x={x} y="179">
                    {count}
                </tspan>
            </text>
        </SvgWrapper>
    );
}
