import tw, { css, styled } from "twin.macro";

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
export const SectionMainTitle = styled.h1(
    ({ baseFontSize = 120, smBaseFontSize = 70 }: MainTitleStyled) => [
        tw`relative z-10 overflow-hidden whitespace-nowrap overflow-ellipsis`,
        css`
            color: var(--black-color);
            font-size: ${smBaseFontSize}px;
            height: ${smBaseFontSize}px;
            width: 100%;
            font-family: "Larsseit-Bold";

            ${up("lg")} {
                font-size: ${baseFontSize}px;
                height: ${baseFontSize}px;
            }
        `,
    ]
);

export const MainTitleTop = styled.h1(
    ({
        baseFontSize = 70,
        smBaseFontSize = 70,
        percentage = 20,
    }: TitleGradientStyled) => [
        tw`relative z-10`,
        css`
            color: var(--black-color);
            background: linear-gradient(
                180deg,
                var(--black-color) ${(percentage * 100) / 100}px,
                transparent ${(percentage * 100) / 100}px
            );
            background-clip: text;
            font-size: ${smBaseFontSize}px;
            line-height: ${smBaseFontSize}px;
            width: 100%;
            -webkit-text-fill-color: transparent;
            font-family: "Larsseit-Bold";

            ${up("lg")} {
                font-size: ${baseFontSize}px;
                line-height: ${baseFontSize}px;
                background-clip: text;
            }

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
        `,
    ]
);

export const MainTitleBottom = styled.h1(
    ({
        baseFontSize = 70,
        smBaseFontSize = 70,
        percentage = 86,
    }: TitleGradientStyled) => [
        tw`relative z-10`,
        css`
            color: var(--black-color);
            background: linear-gradient(
                0deg,
                var(--black-color) ${(percentage * 100) / 100}px,
                transparent ${(percentage * 100) / 100}px
            );
            background-clip: text;
            font-size: ${smBaseFontSize}px;
            line-height: ${smBaseFontSize}px;
            width: 100%;
            -webkit-text-fill-color: transparent;
            font-family: "Larsseit-Bold";

            ${up("lg")} {
                font-size: ${baseFontSize}px;
                line-height: ${baseFontSize}px;
                background-clip: text;
            }

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
        `,
    ]
);
