import { Fragment, FunctionComponent } from "react";

import tw, { styled, css } from "twin.macro";

import { Background } from "@components/background";
import { FullPageOverlay } from "@components/full-page-overlay";
import { Overlays } from "@components/overlays";

interface Props {}

const Main = styled.main(({ hasGradient }: { hasGradient: boolean }) => [
    tw`relative h-full w-full min-h-screen text-primary-color`,
    css`
        -webkit-backface-visibility: hidden;
    `,
    hasGradient &&
        css`
            background: linear-gradient(
                314.58deg,
                rgba(191, 255, 160, 0.1) 0%,
                rgba(136, 238, 251, 0.1) 30.9%,
                rgba(185, 166, 254, 0.1) 61.63%,
                rgba(255, 171, 252, 0.1) 100%
            );
        `,
]);

export const Layout: FunctionComponent<Props> = ({ children }) => (
    <Fragment>
        <Overlays />
        <FullPageOverlay />
        <Main hasGradient>
            <Background />
            {children}
        </Main>
    </Fragment>
);
