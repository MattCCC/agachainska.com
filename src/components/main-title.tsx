import tw, { css, styled } from "twin.macro";

import { SerializedStyles } from "@emotion/react";
import { up } from "@utils/screens";

/**
 * Interfaces
 */
interface MainTitleStyled {
    baseFontSize?: number;
    smBaseFontSize?: number;
    percentage: number;
}

interface TitleGradientStyled extends MainTitleStyled {
    percentage: number;
}

/**
 * Styles
 */

const title = (
    smBaseFontSize: number,
    baseFontSize: number
): SerializedStyles => css`
    background-clip: text;
    color: var(--black-color);
    width: 100%;
    -webkit-text-fill-color: transparent;
    font-family: "Larsseit-Bold";

    font-size: ${smBaseFontSize}px;
    line-height: ${smBaseFontSize}px;

    ${up("lg")} {
        font-size: ${baseFontSize}px;
        line-height: ${baseFontSize + 10}px;
    }
`;

const gradient = (
    deg: number,
    smBaseFontSize: number,
    baseFontSize: number,
    percentage: number
): SerializedStyles => css`
    background-image: linear-gradient(
        ${deg}deg,
        var(--black-color) ${(smBaseFontSize * percentage) / 100}px,
        transparent ${(smBaseFontSize * percentage) / 100}px
    );

    ${up("lg")} {
        background-image: linear-gradient(
            ${deg}deg,
            var(--black-color) ${(baseFontSize * percentage) / 100}px,
            transparent ${(baseFontSize * percentage) / 100}px
        );
    }
`;

const beforeTitle = css`
    &:before {
        position: absolute;
        left: 0;
        bottom: 0;
        content: attr(data-text);
        clip-path: circle(500% at 0px 0px);
        -webkit-text-stroke-width: 2px;
        -webkit-text-stroke-color: rgba(0, 0, 0, 0.8);
        width: 100%;
        height: 100%;
    }
`;

export const SectionMainTitle = styled.h1(
    ({ baseFontSize = 120, smBaseFontSize = 70 }: MainTitleStyled) => [
        tw`relative z-10 overflow-hidden whitespace-nowrap overflow-ellipsis`,
        title(smBaseFontSize, baseFontSize),
    ]
);

export const MainTitleTop = styled.h1(
    ({
        baseFontSize = 70,
        smBaseFontSize = 70,
        percentage = 20,
    }: TitleGradientStyled) => [
        tw`relative z-10`,
        gradient(180, smBaseFontSize, baseFontSize, percentage),
        title(smBaseFontSize, baseFontSize),
        beforeTitle,
    ]
);

export const MainTitleBottom = styled.h1(
    ({
        baseFontSize = 70,
        smBaseFontSize = 70,
        percentage = 86,
    }: TitleGradientStyled) => [
        tw`relative z-10`,
        gradient(0, smBaseFontSize, baseFontSize, percentage),
        title(smBaseFontSize, baseFontSize),
        beforeTitle,
    ]
);
