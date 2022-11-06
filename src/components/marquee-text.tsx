import { ReactElement, Fragment } from "react";

import tw, { css, styled } from "twin.macro";

import { Global } from "@emotion/react";

interface Props {
    text: string;
}

const GlobalBase = (): ReactElement => (
    <Global
        styles={css`
            @keyframes marqueeEffect {
                0% {
                    transform: translate3d(0, 0, 0);
                }
                100% {
                    transform: translate3d(-50%, 0, 0);
                }
            }
        `}
    />
);

const TextWrapper = styled.span(() => [
    css`
        width: 10000px;
    `,
]);

const TextContainer = styled.span(() => [
    tw`inline-block select-none`,
    css`
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
        animation: 20s linear infinite marqueeEffect;
    `,
]);

const Text = styled.span(() => [
    tw`inline-block`,
    css`
        margin: 0 10px;
    `,
]);

export function MarqueeText({ text = "" }: Props) {
    return (
        <Fragment>
            <GlobalBase />
            <TextWrapper>
                <TextContainer>
                    <Text>{text}</Text>
                    <Text>{text}</Text>
                    <Text>{text}</Text>
                    <Text>{text}</Text>
                </TextContainer>
            </TextWrapper>
        </Fragment>
    );
}
