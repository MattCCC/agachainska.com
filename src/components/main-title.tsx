import { up } from "@utils/screens";
import tw, { css, styled } from "twin.macro";

/**
 * Styles
 */

const smBaseFontSize = 70;
const baseFontSize = 120;

export const MainTitle = styled.h1(() => [
    tw`relative z-10 overflow-hidden whitespace-nowrap overflow-ellipsis`,
    css`
        top: -${Math.floor(smBaseFontSize * (2 / 3))}px;
        margin-bottom: -${Math.floor(smBaseFontSize * (2 / 3))}px;
        color: var(--black-color);
        background: linear-gradient(
            0deg,
            var(--black-color) ${smBaseFontSize / 2 + 30}px,
            transparent ${smBaseFontSize / 2 + 30}px
        );
        background-clip: text;
        font-size: ${smBaseFontSize}px;
        height: ${smBaseFontSize + 40}px;
        width: 100%;
        -webkit-text-fill-color: transparent;
        font-family: "Larsseit-Bold";

        ${up("lg")} {
            top: -${Math.floor(baseFontSize * (2 / 3))}px;
            margin-bottom: -${Math.floor(baseFontSize * (2 / 3))}px;
            font-size: ${baseFontSize}px;
            height: ${baseFontSize + 40}px;
            background: linear-gradient(
                0deg,
                var(--black-color) ${baseFontSize / 2 + 20}px,
                transparent ${baseFontSize / 2 + 20}px
            );
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
            height: 100%;
            width: 100%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    `,
]);
