import tw, { css, styled } from "twin.macro";

import { BigNumber } from "components/big-number";
import { H4 } from "components/h4";
import { MainContainer } from "components/main-container";
import { MainTitleBottom } from "components/main-title";
import { ReactComponent as PrevIcon } from "svg/down.svg";
import { ReactComponent as NextIcon } from "svg/up.svg";
import { up } from "utils/screens";
import { includeProps } from "utils/styled";

interface ContentContainerProps {
    variant?: string;
}

export const MainSection = styled(
    MainContainer,
    includeProps(["topPadding"])
)(() => [tw`absolute z-10 col-start-2 col-end-13`]);

export const ContentContainer = styled.div(
    ({ variant = "3/4" }: ContentContainerProps) => [
        tw`max-w-full`,
        variant === "3/4" &&
            css`
                width: 613px;
            `,
        variant === "full" &&
            css`
                width: 820px;
            `,
    ]
);

export const MainTitleWrapper = styled.div(
    tw`absolute max-w-[90%] bottom-[-43px] lg:bottom-[-74px]`
);

export const MainTitle = styled(MainTitleBottom)(
    ({ baseFontSize = 120, percentage = 62 }) => [
        tw`uppercase`,
        css`
            top: -${Math.floor(percentage / 2 - 4)}px;
            margin-bottom: -${Math.floor(percentage / 2 - 4)}px;

            ${up("lg")} {
                top: -${Math.floor(baseFontSize * (1 / 3) + 6)}px;
                margin-bottom: -${Math.floor(baseFontSize * (1 / 3) + 6)}px;
            }
        `,
    ]
);

export const Paragraph = styled.p(() => [tw`mb-[40px]`]);

export const StyledNumber = styled(BigNumber)(() => [
    css`
        max-width: 100%;
        transform: translateX(50%);
        width: 150px;

        ${up("lg")} {
            transform: none;
            width: 136px;
            height: 117px;
        }
    `,
]);

export const HeroWrapper = styled.div(() => [
    tw`relative w-full col-start-1 col-end-13 lg:col-start-2 lg:col-end-12`,
    tw`mb-[70px] h-[200px] sm:h-[320px] md:h-[390px] lg:h-[462px] lg:mb-[90px]`,
]);

export const TableProject = styled.div(() => [
    tw`grid max-w-full grid-flow-row grid-cols-1 grid-rows-4 mb-20 lg:grid-cols-2 lg:grid-flow-col`,
    css`
        width: 820px;
        line-height: 24px;
    `,
]);

export const TableCredits = styled.div(() => [
    tw`grid max-w-full grid-flow-row grid-cols-1 grid-rows-2 lg:grid-cols-3 lg:grid-flow-col`,
    css`
        width: 820px;
        line-height: 24px;
    `,
]);

export const TableStats = styled.div(() => [
    tw`grid max-w-full grid-flow-row grid-cols-1 lg:grid-cols-3 lg:grid-flow-row`,
    tw`w-[820px] leading-[24px]`,
]);

export const SingleStat = styled.div(() => [
    css`
        &.space {
            ${tw`lg:mb-[150px]`}
        }
    `,
]);

export const StatsCaption = styled(H4)(() => [tw`pl-[25%] lg:pl-[10px]`]);

export const CellTitle = styled.div(() => [tw`font-fbold`, tw`mt-[12px]`]);

export const Article = styled.article(() => [tw`relative`]);

export const ArticleSection = styled.section(() => [
    tw`relative z-10 mx-auto`,
    css`
        max-width: 1069px;
        padding: 0 15px 1px;
    `,
]);

export const TimelineWrapper = styled.aside(() => [
    tw`sticky top-0 right-0 z-20 hidden ml-auto lg:block lg:col-start-11`,
    css`
        margin-bottom: -254px;
        width: 220px;
        margin-right: 84px;
        transform: translateY(90px);
    `,
]);

/**
 * Images
 */
export const FullSizeImageWrapper = styled.figure(() => [
    tw`overflow-hidden`,
    tw`mb-[90px] lg:h-[546px] lg:w-[820px]`,
]);

export const TwoImagesWrapper = styled.figure(() => [
    tw`grid grid-flow-col grid-cols-2 gap-6 overflow-hidden`,
    tw`mb-[90px] h-[220px] lg:h-[562px] lg:w-[820px]`,
]);

/**
 * Pagination
 */
export const Controls = styled.div(() => [
    tw`relative z-10 content-end justify-end hidden ml-auto lg:flex`,
    css`
        top: -70px;
    `,
]);

export const Button = styled.button(() => [
    tw`flex-row cursor-pointer select-none lg:prose-16 lg:leading-5`,
    css`
        &:last-child {
            margin-left: 40px;
        }
    `,
]);

export const PrevIconStyled = styled(PrevIcon)(() => [
    tw`inline-block mr-4 text-center transform rotate-90`,
]);

export const NextIconStyled = styled(NextIcon)(() => [
    tw`inline-block ml-4 text-center transform rotate-90`,
]);
