import tw, { css, styled } from "twin.macro";

import { BigNumber } from "@components/big-number";
import { H4 } from "@components/h4";
import { MainTitleBottom } from "@components/main-title";
import { ReactComponent as PrevIcon } from "@svg/down.svg";
import { ReactComponent as NextIcon } from "@svg/up.svg";
import { up } from "@utils/screens";

/**
 * Styles
 */
export const MainSection = styled.section(() => [
    tw`relative mx-auto z-10`,
    css`
        max-width: 1069px;
        padding: 0 15px;
    `,
]);

export const MainTitle = styled(MainTitleBottom)(({ baseFontSize = 120, smBaseFontSize = 70 }) => [
    tw`relative`,
    css`
        top: -${Math.floor(smBaseFontSize * (2 / 3))}px;
        margin-bottom: -${Math.floor(smBaseFontSize * (2 / 3))}px;
        height: ${smBaseFontSize}px;

        ${up("lg")} {
            font-size: ${baseFontSize}px;
            height: ${baseFontSize + 5}px;
        }
    `,
]);

export const Paragraph = styled.p(() => [
    css`
        margin-bottom: 40px;
    `,
]);

export const ContentContainer = styled.div(() => [
    css`
        max-width: 1069px;

        &.sm {
            width: 827px;
            max-width: 100%;
        }
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

export const HeroImage = styled.div(() => [
    tw`relative z-10`,
    css`
        height: 200px;
        width: 1069px;
        max-width: 100%;
        background: url("/img/projects/danish-bakery.jpg");
        background-color: rgba(255, 255, 255, 0.8);
        background-size: contain;

        ${up("lg")} {
            background-size: cover;
            height: 462px;
        }
    `,
]);

export const TableProject = styled.div(() => [
    tw`grid grid-cols-1 lg:grid-cols-2 grid-rows-4 grid-flow-row lg:grid-flow-col`,
    css`
        width: 827px;
        max-width: 100%;
        line-height: 24px;
    `,
]);

export const TableCredits = styled.div(() => [
    tw`grid grid-cols-1 lg:grid-cols-3 grid-rows-2 grid-flow-row lg:grid-flow-col`,
    css`
        width: 827px;
        max-width: 100%;
        line-height: 24px;
    `,
]);

export const TableStats = styled.div(() => [
    tw`grid grid-cols-1 lg:grid-cols-3 grid-flow-row lg:grid-flow-col`,
    css`
        grid-template-rows: repeat(4, minmax(0, max-content));
        width: 827px;
        max-width: 100%;
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
    css`
        margin-top: 12px;
        font-family: "Larsseit-Bold";
    `,
]);

export const Article = styled.article(() => [tw`relative`]);

export const ArticleSection = styled.section(() => [
    tw`relative mx-auto z-10`,
    css`
        max-width: 1069px;
        padding: 0 15px 1px;
    `,
]);

export const TimelineWrapper = styled.aside(() => [
    tw`sticky hidden lg:block z-20`,
    css`
        top: 0;
        right: 0;
        margin-bottom: -254px;
        width: 220px;
        margin-left: auto;
        margin-right: 84px;
        transform: translateY(90px);
    `,
]);

/**
 * Images
 */
export const FullPageImgWrapper = styled.figure(() => [
    css`
        max-width: 100%;
        width: 100%;
        border: 1px solid #979797;
        margin-bottom: 40px;

        ${up("lg")} {
            max-width: none;
            width: 100vw;
            position: relative;
            height: auto;
            margin: 0 auto 90px -50vw;
            left: calc(50% - 8px);
        }
    `,
]);

export const FullSizeImageWrapper = styled.figure(() => [
    css`
        margin-bottom: 90px;

        ${up("lg")} {
            height: 546px;
        }
    `,
]);

export const TwoImagesWrapper = styled.figure(() => [
    tw`grid grid-cols-2 grid-flow-col gap-6`,
    css`
        margin-bottom: 90px;
        height: 220px;

        ${up("lg")} {
            height: 562px;
        }
    `,
]);

/**
 * Pagination
 */
export const Controls = styled.div(() => [
    tw`relative hidden lg:flex justify-end content-end ml-auto z-10`,
    css`
        top: -60px;
    `,
]);

export const Button = styled.button(() => [
    tw`lg:prose-16px flex-row cursor-pointer select-none`,
    css`
        &:last-child {
            margin-left: 40px;
        }
    `,
]);

export const PrevIconStyled = styled(PrevIcon)(() => [
    tw`inline-block text-center mr-4 transform rotate-90`,
]);

export const NextIconStyled = styled(NextIcon)(() => [
    tw`inline-block text-center ml-4 transform rotate-90`,
]);
