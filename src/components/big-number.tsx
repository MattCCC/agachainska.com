import {
    CSSProperties,
    SVGProps,
    memo,
    useEffect,
    useMemo,
    useRef,
} from "react";

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

const Tspan = memo(
    ({
        animate = false,
        value = 0,
        x = 0,
        y = 0,
    }: {
        animate: boolean;
        value: string | number;
        x: number;
        y: number;
    }) => {
        const ref = useRef<SVGTSpanElement>(null);

        useEffect(() => {
            if (!ref.current) {
                return;
            }

            const count = animate
                ? Number(value) > 0
                    ? "1"
                    : "0"
                : String(value);

            ref.current.textContent = count;

            if (animate) {
                const delay = 1000 / Number(value || 1);
                let num = Number(count);

                const intervalID = setInterval(() => {
                    if (num === value) {
                        clearInterval(intervalID);
                    }

                    if (ref.current) {
                        ref.current.textContent = String(num);
                    }

                    num++;
                }, delay);
            }
        }, [animate, value]);

        return <tspan ref={ref} x={x} y={y}></tspan>;
    }
);

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
    const viewBoxWidth = useMemo(
        () => Number(viewBox.split(" ")[2]),
        [viewBox]
    );

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
                <Tspan animate={animate} value={value} x={x + 8.129} y={179} />
            </text>
            <text
                fill="#FFF"
                stroke="#0B0B0B"
                strokeWidth="1.5"
                textAnchor={textAnchor}
            >
                <Tspan animate={animate} value={value} x={x} y={179} />
            </text>
        </SvgWrapper>
    );
}
