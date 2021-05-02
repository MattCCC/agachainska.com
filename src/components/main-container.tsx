import { FunctionComponent } from "react";

import tw, { styled } from "twin.macro";

interface Props {
    topPadding?: boolean;
}

type Cols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface PropsRow {
    start?: Cols;
    end?: Cols | 13;
}

const Grid = styled.div(({ topPadding }: Props) => [
    tw`container grid grid-flow-row grid-cols-12 mx-auto lg:gap-7`,
    topPadding && tw`pt-28 lg:pt-32`,
]);

const Row = styled.div(({ start, end }: PropsRow) => [
    start === 1 && tw`col-start-1`,
    start === 2 && tw`col-start-1 lg:col-start-2`,
    end === 11 && tw`col-end-13 lg:col-end-11`,
    end === 12 && tw`col-end-13 lg:col-end-12`,
    end === 13 && tw`col-end-13`,
]);

export const MainContainer: FunctionComponent<Props> = ({
    topPadding = false,
    children,
}) => <Grid topPadding={topPadding}>{children}</Grid>;

export const GridRow: FunctionComponent<PropsRow> = ({
    start = 1,
    end = 13,
    children,
}) => (
    <Row start={start} end={end}>
        {children}
    </Row>
);
