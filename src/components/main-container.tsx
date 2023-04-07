import { ElementType, PropsWithChildren } from "react";

import tw, { styled } from "twin.macro";

import { excludeProps } from "utils/styled";

interface Props {
    topPadding?: boolean;
    as?: string & ElementType<any>;
    tw?: string;
}

type Cols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface PropsRow {
    start?: Cols;
    end?: Cols | 13;
    as?: string & ElementType<any>;
    tw?: string;
    className?: string;
}

const Grid = styled.div(({ topPadding }: Props) => [
    tw`container relative z-10 grid grid-flow-row grid-cols-12 mx-auto lg:gap-7`,
    topPadding && tw`pt-28 lg:pt-32`,
]);

const Row = styled("div").withConfig(excludeProps(["start", "end"]))(
    ({ start, end }: PropsRow) => [
        start === 1 && tw`col-start-1`,
        start === 2 && tw`col-start-1 lg:col-start-2`,
        start === 7 && tw`col-start-1 lg:col-start-7`,
        end === 6 && tw`col-end-13 lg:col-end-6`,
        end === 7 && tw`col-end-13 lg:col-end-7`,
        end === 8 && tw`col-end-13 lg:col-end-8`,
        end === 9 && tw`col-end-13 lg:col-end-9`,
        end === 10 && tw`col-end-13 lg:col-end-10`,
        end === 11 && tw`col-end-13 lg:col-end-11`,
        end === 12 && tw`col-end-13 lg:col-end-12`,
        end === 13 && tw`col-end-13`,
    ]
);

export const MainContainer = ({
    topPadding = false,
    as = "div",
    children,
}: PropsWithChildren<Props>) => (
    <Grid topPadding={topPadding} as={as}>
        {children}
    </Grid>
);

export const GridRow = ({
    start = 1,
    end = 13,
    children,
    ...props
}: PropsWithChildren<PropsRow>) => (
    <Row start={start} end={end} {...props}>
        {children}
    </Row>
);
