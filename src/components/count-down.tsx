import tw, { css, styled } from "twin.macro";
import { Global } from "@emotion/react";

/**
 * Styles
 */
const GlobalBase = () => <Global styles={css`
    @keyframes countdown {
        from {
            stroke-dashoffset: 480px;
        }
        to {
            stroke-dashoffset: 0px;
        }
    }
`} />

const ProgressLabel = styled.div(() => [
    tw`rounded-full border-2 border-purple-300 border-opacity-25 tracking-widest align-middle text-center text-xl text-opacity-40 text-melrose-color tracking-widest absolute bottom-14 right-14 h-16 w-16`,
    css`
        line-height: 4rem;
        text-shadow: 0px 0px 3px var(--melrose-color);
    `
]);

const ProgressCircleWrapper = styled.svg(() => [
    tw`rounded-full align-middle text-center tracking-widest ring-opacity-20 absolute bottom-14 right-14 h-16 w-16`,
    css`
        transform: rotateY(0deg) rotateZ(-90deg);
    `
]);

const ProgressCircle = styled.circle(() => [
    tw`text-center tracking-widest ring-opacity-20 absolute bottom-14 right-14 h-16 w-16`,
    css`
        stroke-dasharray: 480px;
        stroke-dashoffset: 0px;
        stroke-linecap: round;
        stroke-width: 5px;
        stroke: var(--melrose-color);
        fill: none;
        animation: countdown 10s linear infinite;
    `
]);

/**
 * Component
 * @param props
 */
export function CountDown({ ...rest }: Props) {
    return (
        <span>
            <GlobalBase />
            <ProgressCircleWrapper viewBox="0 0 150 150" preserveAspectRatio="xMinYMin meet" 
                    filter="url(#filterCd)">
                <defs>
                     <filter id="filterCd">
                        <feDropShadow dx="0" dy="0" stdDeviation="1.2"
                        floodColor="#C0A4FF" floodOpacity="0.9"/>
                     </filter>
                </defs>
                <ProgressCircle 
                    r="75"
                    cx="50%"
                    cy="50%"
                    filter="url(#filterCd)"
                />
            </ProgressCircleWrapper>

            <ProgressLabel>9s</ProgressLabel>
        </span>
    );
}
