import tw, { css, styled } from "twin.macro";
import { useEffect, useState } from "react";

/**
 * Styles
 */
const CountDownLabel = styled.div(() => [
    tw`absolute bottom-14 right-14 h-16 w-16 tracking-widest align-middle rounded-full border-2 border-purple-300 border-opacity-25 text-center text-xl text-melrose text-opacity-30`,
    css`
        line-height: 4rem;
        text-shadow: 0 0 1px var(--melrose-color);
    `,
]);

const ProgressCircleWrapper = styled.svg(() => [
    tw`absolute bottom-14 right-14 h-16 w-16 rounded-full align-middle tracking-widest ring-opacity-20 text-center`,
    css`
        transform: rotateY(0deg) rotateZ(-90deg);
    `,
]);

const ProgressCircle = styled.circle(() => [
    tw`absolute bottom-14 right-14 h-16 w-16 text-center tracking-widest ring-opacity-20`,
    css`
        stroke-linecap: round;
        stroke-width: 5px;
        stroke: var(--melrose-color);
        fill: none;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation: left 1s ease-in forwards;
        transition: stroke-dashoffset 0.5s;
    `,
]);

/**
 * Interfaces
 */
interface Props {
    seconds: number;
    onFinished?: Function;
}

/**
 * Component
 * @param props
 */
export function CountDown({ seconds = 0, onFinished }: Props) {
    const radiusOffset = 480;
    const defaultState = { currentSeconds: seconds };
    const [state, setState] = useState(defaultState);

    useEffect(() => {
        if (state.currentSeconds === 0) {
            if (typeof onFinished === "function") {
                onFinished();
            }

            return () => {};
        }

        const onTimer = () => {
            setState({
                currentSeconds: state.currentSeconds - 1,
            });
        };

        setTimeout(onTimer, 1000);

        return () => {};
    });

    return (
        <span>
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
                            floodColor="#C0A4FF"
                            floodOpacity="0.9"
                        />
                    </filter>
                </defs>
                <ProgressCircle
                    r="75"
                    cx="50%"
                    cy="50%"
                    filter="url(#filterCd)"
                    style={{
                        strokeDasharray: radiusOffset,
                        strokeDashoffset: `${
                            (radiusOffset / seconds) * state.currentSeconds
                        }`,
                    }}
                />
            </ProgressCircleWrapper>

            <CountDownLabel>{state.currentSeconds}s</CountDownLabel>
        </span>
    );
}
