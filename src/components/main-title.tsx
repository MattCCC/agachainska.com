import tw, { css, styled, TwStyle } from "twin.macro";

const title = (): TwStyle[] => [
    tw`relative z-10 w-full subpixel-antialiased text-black select-none font-fbold bg-clip-text [-webkit-text-fill-color: transparent]`,
];

export const MainTitleTop = styled.h2(() => [
    title(),
    css`
        &:before {
            ${tw`absolute bottom-0 left-0 w-full h-full`}
            content: attr(data-text);
            clip-path: circle(500% at 0px 0px);
            -webkit-text-stroke-width: 2px;
            -webkit-text-stroke-color: rgba(0, 0, 0, 0.8);
        }
    `,
]);

export const MainTitleBottom = styled.h1(() => [
    title(),
    css`
        &:before {
            ${tw`absolute bottom-0 left-0 w-full h-full`}
            content: attr(data-text);
            clip-path: circle(500% at 0px 0px);
            -webkit-text-stroke-width: 2px;
            -webkit-text-stroke-color: rgba(0, 0, 0, 0.8);
        }
    `,
]);
