import tw, { css, styled, TwStyle } from "twin.macro";

import { SerializedStyles } from "@emotion/react";
import { up } from "@utils/screens";

interface MainTitleStyled {
    baseFontSize?: number;
    smBaseFontSize?: number;
    percentage: number;
}

interface TitleGradientStyled extends MainTitleStyled {
    percentage: number;
}

const title = (
    smBaseFontSize: number,
    baseFontSize: number
): Array<TwStyle | SerializedStyles> => [
    tw`relative z-10 subpixel-antialiased font-bold text-black select-none`,
    css`
        background-clip: text;
        width: 100%;
        -webkit-text-fill-color: transparent;
        font-size: ${smBaseFontSize}px;
        line-height: ${smBaseFontSize}px;

        ${up("lg")} {
            font-size: ${baseFontSize}px;
            line-height: ${baseFontSize + 10}px;
        }
    `,
];

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
        tw`overflow-hidden whitespace-nowrap overflow-ellipsis`,
        title(smBaseFontSize, baseFontSize),
    ]
);

export const MainTitleTop = styled.h1(
    ({
        baseFontSize = 70,
        smBaseFontSize = 70,
        percentage = 20,
    }: TitleGradientStyled) => [
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
        gradient(0, smBaseFontSize, baseFontSize, percentage),
        title(smBaseFontSize, baseFontSize),
        beforeTitle,
    ]
);
