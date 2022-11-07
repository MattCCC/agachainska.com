import { memo, useEffect, useState } from "react";

import tw, { css, styled } from "twin.macro";

import { Global } from "@emotion/react";

interface Props {
    seconds: number;
    onFinishedCallback?: (() => void) | null;
}

const GlobalBase = () => (
    <Global
        styles={css`
            @keyframes countdown {
                from {
                    stroke-dashoffset: 480px;
                }
                to {
                    stroke-dashoffset: 0;
                }
            }
        `}
    />
);

const CounteDownWrapper = styled.div(() => [tw`hidden lg:block`]);

const CountDownLabel = styled.div(() => [
    tw`absolute w-16 h-16 align-middle border-2 border-purple-300 border-opacity-25 rounded-full bottom-14 right-14`,
    tw`text-xl text-center text-melrose`,
    css`
        line-height: 4rem;
        text-shadow: 0 2px 4px rgba(192, 164, 255, 0.6);
    `,
]);

const ProgressCircleWrapper = styled.svg(() => [
    tw`absolute w-16 h-16 text-center align-middle rounded-full bottom-14 right-14 ring-opacity-20`,
    css`
        transform: rotateY(0deg) rotateZ(-90deg);

        feDropShadow {
            flood-color: var(--melrose);
        }
    `,
]);

const ProgressCircle = styled.circle(() => [
    tw`absolute w-16 h-16 bottom-14 right-14 ring-opacity-20`,
    css`
        stroke-dasharray: 480px;
        stroke-dashoffset: 0;
        stroke-linecap: round;
        stroke-width: 5px;
        stroke: var(--melrose);
        fill: none;
        animation: countdown 10s linear 1;
    `,
]);

export const CountDown = memo(
    ({ seconds = 0, onFinishedCallback = null }: Props) => {
        const [currentSeconds, setSeconds] = useState(seconds);

        if (currentSeconds === 0 && onFinishedCallback) {
            onFinishedCallback();
        }

        useEffect(() => {
            const interval = setInterval(() => {
                setSeconds((currentSecs) => Math.max(0, currentSecs - 1));
            }, 1000);

            return (): void => {
                clearInterval(interval);
            };
        }, []);

        return (
            <CounteDownWrapper>
                <GlobalBase />
                <ProgressCircleWrapper
                    viewBox="0 0 150 150"
                    preserveAspectRatio="xMinYMin meet"
                    filter="url(#filterCd)"
                >
                    <defs>
                        <filter id="filterCd">
                            <feDropShadow
                                dx="0"
                                dy="0"
                                stdDeviation="1.2"
                                floodOpacity="0.9"
                            />
                        </filter>
                    </defs>
                    <ProgressCircle
                        r="75"
                        cx="50%"
                        cy="50%"
                        filter="url(#filterCd)"
                    />
                </ProgressCircleWrapper>

                <CountDownLabel>{currentSeconds}s</CountDownLabel>
            </CounteDownWrapper>
        );
    },
    (prevProps, nextProps) => prevProps.seconds === nextProps.seconds
);
