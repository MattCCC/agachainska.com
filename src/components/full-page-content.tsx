import { ReactNode } from "react";

interface Props {
    widthPct: number;
    heightPct: string;
    children: ReactNode;
}

export const FullPageContent = ({
    widthPct = 100,
    heightPct = "auto",
    children,
}: Props) => (
    <figure
        style={
            {
                "--width-pct": `${widthPct}vw`,
                "--height-pct": heightPct,
                "--margin-left-value": `${widthPct / 2}vw`,
            } as React.CSSProperties
        }
        // eslint-disable-next-line
        tw="w-full max-w-full overflow-hidden lg:relative lg:w-[--width-pct] lg:h-[--height-pct] lg:max-w-none mb-[40px] lg:left-1/2 lg:mt-0 lg:mr-auto lg:mb-[90px] lg:-ml-[--margin-left-value]"
    >
        {children}
    </figure>
);
