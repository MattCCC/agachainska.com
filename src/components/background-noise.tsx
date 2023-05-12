import { PropsWithChildren, useEffect, useRef } from "react";

import tw, { css, styled } from "twin.macro";

import {
    requestInterval,
    clearRequestInterval,
} from "@essentials/request-interval";

import { getRandomNumber } from "utils/random-number";

interface Props {
    className?: string;
}

const NoiseWrapper = styled.div(() => [
    tw`absolute top-0 left-0 z-0 w-full h-full min-h-screen overflow-hidden`,
    css`
        --y: 0;
        --x: 0;
        backface-visibility: hidden;
        transform: scale(1);
        background: url("/img/bg-pattern.webp") repeat;
        background-position-x: var(--x);
        background-position-y: var(--y);
        will-change: background-position-x;
        opacity: 0.04;
    `,
]);

export const BackgroundNoise = ({
    className = "",
    children,
}: PropsWithChildren<Props>) => {
    const noiseRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!noiseRef.current) {
            return;
        }

        const ref = noiseRef.current;

        const intervalId = requestInterval(() => {
            const randX = getRandomNumber(0, 100);
            const randY = getRandomNumber(0, 100);

            ref.setAttribute(
                "style",
                "--x: " + randX + "px; " + "--y: " + randY + "px"
            );
        }, 150);

        return (): void => {
            if (intervalId) {
                clearRequestInterval(intervalId);
            }
        };
    }, [noiseRef]);

    return (
        <NoiseWrapper ref={noiseRef} className={className}>
            {children}
        </NoiseWrapper>
    );
};
