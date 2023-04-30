import { useIncrementStats } from "domain/single-project/use-increment-stats";
import { memo } from "react";
import tw, { css, styled } from "twin.macro";
import { H4 } from "components/h4";
import { BigNumber } from "components/big-number";

interface StatsProps {
    stats: Array<{ title: string; stat: number } | null>;
    index: number;
}

const StatsTable = styled.div(() => [
    tw`grid max-w-full grid-flow-row grid-cols-1 lg:grid-cols-3 lg:grid-flow-row`,
    tw`w-[820px] leading-[24px]`,
]);

const SingleStat = styled.div(() => [
    css`
        &.space {
            ${tw`lg:mb-[150px]`}
        }
    `,
]);

const StatsCaption = styled(H4)(() => [tw`pl-[25%] lg:pl-[10px]`]);

const CellTitle = styled.div(() => [
    tw`max-w-full font-fbold`,
    tw`w-[150px] lg:w-[136px] lg:h-[117px] mt-[12px]`,
    css`
        transform: translateZ(0);
    `,
]);

export const Stats = memo(({ stats }: StatsProps) => {
    const [refStats, animateStats] = useIncrementStats();

    return (
        <StatsTable ref={refStats}>
            {stats.map((stat, j) => {
                if (!stat) {
                    return null;
                }

                const { title, stat: value } = stat;

                return (
                    <SingleStat
                        key={`stat-${j}`}
                        className={j < 3 ? "space" : "big"}
                    >
                        <CellTitle>
                            <BigNumber
                                id={`stat-number-${j}`}
                                value={value}
                                animate={animateStats}
                            />
                        </CellTitle>

                        <StatsCaption>{title}</StatsCaption>
                    </SingleStat>
                );
            })}
        </StatsTable>
    );
});
