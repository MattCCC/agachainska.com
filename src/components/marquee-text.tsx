import { memo } from "react";

import tw, { css, styled } from "twin.macro";

const TextContainer = styled.span(() => [
    tw`inline-block select-none`,
    css`
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
        animation: 20s linear infinite marqueeEffect;

        @keyframes marqueeEffect {
            0% {
                transform: translate3d(0, 0, 0);
            }
            100% {
                transform: translate3d(-50%, 0, 0);
            }
        }
    `,
]);

const Text = styled.span(() => [
    tw`inline-block`,
    css`
        margin: 0 10px;
    `,
]);

export const MarqueeText = memo(({ text = "" }: { text: string }) => (
    <TextContainer>
        <Text>{text}</Text>
        <Text>{text}</Text>
        <Text>{text}</Text>
        <Text>{text}</Text>
    </TextContainer>
));
