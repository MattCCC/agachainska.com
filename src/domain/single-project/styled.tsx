import tw, { css, styled } from "twin.macro";

import { BigNumber } from "@components/big-number";
import { H4 } from "@components/h4";
import { MainContainer } from "@components/main-container";
import { MainTitleBottom } from "@components/main-title";
import { ReactComponent as PrevIcon } from "@svg/down.svg";
import { ReactComponent as NextIcon } from "@svg/up.svg";
import { up } from "@utils/screens";
import { includeProps } from "@utils/styled";

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
    tw`absolute`,
    css`
        max-width: 90%;
        bottom: -43px;

        ${up("lg")} {
            bottom: -74px;
        }
    `
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

export const Paragraph = styled.p(() => [
    css`
        margin-bottom: 40px;
    `,
]);

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
    css`
        height: 200px;
        margin-bottom: 70px;

        ${up("sm")} {
            height: 320px;
        }

        ${up("md")} {
            height: 390px;
        }

        ${up("lg")} {
            margin-bottom: 90px;
            height: 462px;
        }
    `,
]);

export const TableProject = styled.div(() => [
    tw`grid mb-20 max-w-full grid-flow-row grid-cols-1 grid-rows-4 lg:grid-cols-2 lg:grid-flow-col`,
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
    tw`grid max-w-full grid-flow-row grid-cols-1 lg:grid-cols-3 lg:grid-flow-col`,
    css`
        grid-template-rows: repeat(4, minmax(0, max-content));
        width: 820px;
        line-height: 24px;
    `,
]);

export const StatsCaption = styled(H4)(() => [
    css`
        padding-left: 25%;

        ${up("lg")} {
            padding-left: 10px;
        }

        &.space {
            ${up("lg")} {
                margin-bottom: 150px;
            }
        }
    `,
]);

export const CellTitle = styled.div(() => [
    tw`font-fbold`,
    css`
        margin-top: 12px;
    `,
]);

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
    css`
        margin-bottom: 90px;

        ${up("lg")} {
            height: 546px;
            width: 820px;
        }
    `,
]);

export const TwoImagesWrapper = styled.figure(() => [
    tw`grid grid-flow-col grid-cols-2 gap-6 overflow-hidden`,
    css`
        margin-bottom: 90px;
        height: 220px;

        ${up("lg")} {
            height: 562px;
            width: 820px;
        }
    `,
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
    tw`flex-row cursor-pointer select-none lg:prose-16px`,
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
