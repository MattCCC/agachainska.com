import { ElementType, PropsWithChildren } from "react";

import tw, { styled } from "twin.macro";

interface Props {
    topPadding?: boolean;
    as?: string & ElementType<any>;
    tw?: string;
}

const Grid = styled.div(({ topPadding }: Props) => [
    tw`container relative z-10 mx-auto lg:grid lg:grid-flow-row lg:grid-cols-12 lg:gap-7`,
    topPadding && tw`pt-28 lg:pt-32`,
]);

export const MainContainer = ({
    topPadding = false,
    as = "div",
    children,
}: PropsWithChildren<Props>) => (
    <Grid topPadding={topPadding} as={as}>
        {children}
    </Grid>
);
