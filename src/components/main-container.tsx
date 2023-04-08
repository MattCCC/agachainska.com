import { ElementType, PropsWithChildren } from "react";

import tw, { styled } from "twin.macro";

interface Props {
    topPadding?: boolean;
    as?: string & ElementType<any>;
    tw?: string;
}

const Grid = styled.div(({ topPadding }: Props) => [
    tw`container relative z-10 grid grid-flow-row grid-cols-12 mx-auto lg:gap-7`,
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
