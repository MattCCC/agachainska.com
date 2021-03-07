import tw, { css, styled } from "twin.macro";
import { Global } from "@emotion/react";
import { memo, ReactElement, useEffect, useState } from "react";

/**
 * Styles
 */
const GlobalBase = (): ReactElement => (
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
    tw`absolute bottom-14 right-14 h-16 w-16 tracking-widest align-middle rounded-full border-2 border-purple-300 border-opacity-25`,
    tw`text-center text-xl text-melrose text-opacity-5`,
    css`
        line-height: 4rem;
        text-shadow: 0 0 3px var(--melrose-color);
    `,
]);

const ProgressCircleWrapper = styled.svg(() => [
    tw`absolute bottom-14 right-14 h-16 w-16 rounded-full align-middle tracking-widest ring-opacity-20 text-center`,
    css`
        transform: rotateY(0deg) rotateZ(-90deg);

        feDropShadow {
            flood-color: var(--melrose-color);
        }
    `,
]);

const ProgressCircle = styled.circle(() => [
    tw`absolute bottom-14 right-14 h-16 w-16 text-center tracking-widest ring-opacity-20`,
    css`
        stroke-dasharray: 480px;
        stroke-dashoffset: 0;
        stroke-linecap: round;
        stroke-width: 5px;
        stroke: var(--melrose-color);
        fill: none;
        animation: countdown 10s linear 1;
    `,
]);

/**
 * Interfaces
 */
interface Props {
    seconds: number;
    onFinishedCallback?: (() => void) | null;
}

/**
 * Component
 * @param props
 */
export const CountDown = memo(
    ({ seconds = 0, onFinishedCallback = null, ...props }: Props) => {
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
