import { PropsWithChildren, memo } from "react";

import tw, { css, styled } from "twin.macro";

import { getRandomNumber } from "utils/random-number";

interface Props {
    className?: string;
}

const NoiseWrapper = styled.div(() => [
    tw`absolute top-0 left-0 z-0 w-full h-full min-h-screen overflow-hidden`,
    css`
        @keyframes noiseAnimation {
            0% {
                --x: 0px;
                --y: 0px;
            }
            100% {
                --x: ${getRandomNumber(0, 100)}px;
                --y: ${getRandomNumber(0, 100)}px;
            }
        }

        --y: 0;
        --x: 0;
        backface-visibility: hidden;
        transform: scale(1);
        background: url("/img/bg-pattern.webp") repeat;
        background-position: var(--x) var(--y);
        will-change: background-position;
        opacity: 0.04;
        animation: noiseAnimation 250ms infinite linear;
    `,
]);

export const BackgroundNoise = memo(
    ({ className = "" }: PropsWithChildren<Props>) => (
        <NoiseWrapper className={className} />
    ),
);
