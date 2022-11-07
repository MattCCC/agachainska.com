import {
    CSSProperties,
    PropsWithChildren,
    useEffect,
    useMemo,
    useState,
} from "react";

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
    tw`absolute top-0 left-0 right-0 z-0 w-full h-full min-h-screen overflow-hidden`,
    css`
        backface-visibility: hidden;
        transform: scale(1);
        background: url("/img/bg-pattern.png") repeat;
        background-position: var(--x) var(--y);
        will-change: background-position;
        opacity: 0.04;
    `,
]);

export const BackgroundNoise = ({
    className = "",
    children,
}: PropsWithChildren<Props>) => {
    const defaultState = useMemo(() => ({ x: 0, y: 0 }), []);
    const [position, setPosition] = useState(defaultState);
    const backgroundStyle = {
        "--x": `${position.x}px`,
        "--y": `${position.y}px`,
    } as CSSProperties;

    useEffect(() => {
        const intervalId = requestInterval(() => {
            setPosition({
                x: getRandomNumber(0, 100),
                y: 0,
            });
        }, 150);

        return (): void => {
            if (intervalId) {
                clearRequestInterval(intervalId);
            }
        };
    }, []);

    return (
        <NoiseWrapper className={className} style={backgroundStyle}>
            {children}
        </NoiseWrapper>
    );
};
