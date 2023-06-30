import { PropsWithChildren } from "react";
import tw, { styled } from "twin.macro";

interface Props {
    widthPct?: number;
    heightPct?: string;
}

const FullPageContentFigure = styled.figure(() => [
    tw`w-full max-w-full overflow-hidden lg:relative lg:max-w-none mb-[40px] lg:left-1/2 lg:mt-0 lg:mr-auto lg:mb-[90px]`,
    tw`lg:w-[--width-pct] lg:h-[--height-pct] lg:-ml-[--margin-left-value]`,
]);

export const FullPageContent = ({
    widthPct = 100,
    heightPct = "auto",
    children,
}: PropsWithChildren<Props>) => (
    <FullPageContentFigure
        style={
            {
                "--width-pct": `${widthPct}vw`,
                "--height-pct": heightPct,
                "--margin-left-value": `${widthPct / 2}vw`,
            } as React.CSSProperties
        }
        // eslint-disable-next-line
    >
        {children}
    </FullPageContentFigure>
);
