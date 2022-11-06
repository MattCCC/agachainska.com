import { SVGProps, useEffect, useMemo, useState } from "react";

import useInterval from "@use-it/interval";
import { getRandomNumber } from "utils/random-number";

interface Props extends SVGProps<SVGSVGElement> {
    value: number | string;
    animate?: boolean;
    displayOnRight?: boolean;
    viewBox?: string;
}

export function BigNumber({
    value = 1,
    animate = false,
    displayOnRight = false,
    viewBox = "0 0 200 200",
    ...props
}: Props) {
    const [count, setCount] = useState("0");
    const [delay, setDelay] = useState<null | number>(null);
    const viewBoxWidth = useMemo(
        () => Number(viewBox.split(" ")[2]),
        [viewBox]
    );
    const id = useMemo(() => getRandomNumber(1, 9 ** 9), []);

    useEffect(() => {
        if (animate) {
            setCount(value > 0 ? "1" : "0");
            setDelay(1000 / Number(value || 1));
        } else {
            setCount(String(value));
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
            setCount(String(num + 1));
        }
    }, delay);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox={viewBox}
            {...props}
        >
            <defs>
                <pattern
                    id={"pattern-" + id}
                    width="787.894"
                    height="787.894"
                    x="-779.765"
                    y="-787.894"
                    patternUnits="userSpaceOnUse"
                >
                    <use
                        transform="scale(1.53886)"
                        xlinkHref={"#shade-" + id}
                    ></use>
                </pattern>
                <image
                    id={"shade-" + id}
                    width="512"
                    height="512"
                    xlinkHref={"/img/bg-pattern.png"}
                ></image>
            </defs>
            <g
                fill="none"
                fillRule="evenodd"
                stroke="none"
                strokeWidth="1"
                fontFamily="Larsseit-Bold, Larsseit"
                fontSize="180"
                fontWeight="bold"
                letterSpacing="7.714"
            >
                <g fillRule="nonzero">
                    <g>
                        <text
                            fill={`url(#pattern-${id})`}
                            stroke="#000"
                            strokeWidth="1.5"
                            textAnchor={displayOnRight ? "end" : "start"}
                        >
                            <tspan
                                x={
                                    (displayOnRight ? viewBoxWidth - 5 : 0) +
                                    8.129
                                }
                                y="179"
                            >
                                {count}
                            </tspan>
                        </text>
                        <text
                            fill="#FFF"
                            stroke="#0B0B0B"
                            strokeWidth="1.5"
                            textAnchor={displayOnRight ? "end" : "start"}
                        >
                            <tspan
                                x={displayOnRight ? viewBoxWidth - 5 : 0}
                                y="179"
                            >
                                {count}
                            </tspan>
                        </text>
                    </g>
                </g>
            </g>
        </svg>
    );
}
