import { PropsWithChildren, StrictMode } from "react";

import tw, { styled, css } from "twin.macro";

import { Global } from "@emotion/react";

import { Background } from "components/background";
import { Footer } from "components/footer";
import { FullPageOverlay } from "components/full-page-overlay";
import { Header } from "components/header";
import { Overlays } from "components/overlays";
import { useOnRouteChange } from "hooks/use-on-route-change";
import { useStoreProp } from "store/index";

interface Props {
    hasGradient: boolean;
    showFooter: boolean;
    backgroundColor: string;
    darkTheme: boolean;
}

const DarkTheme = () => (
    <Global
        styles={css`
            :root body {
                --primary: #fff;
                --tertiary: #0b0b0b;
            }
        `}
    />
);

const Main = styled.main(
    ({ hasGradient, backgroundColor, showFooter, darkTheme }: Props) => [
        tw`relative z-10 w-full h-full min-h-screen text-primary pt-safe-top`,
        css`
            backface-visibility: hidden;
        `,
        showFooter && tw`lg:mb-[810px]`,
        backgroundColor &&
            css`
                background: ${backgroundColor};
            `,
        hasGradient &&
            css`
                background: linear-gradient(
                    314.58deg,
                    rgb(249, 255, 246) 0%,
                    rgb(243, 253, 255) 30.9%,
                    rgb(248, 246, 255) 61.63%,
                    rgb(255, 247, 255) 100%
                );
            `,
        !backgroundColor && !hasGradient && !darkTheme && tw`bg-white`,
        !backgroundColor && darkTheme && tw`bg-black`,
    ]
);

export const Layout = ({ children }: PropsWithChildren<unknown>) => {
    const [showbackgroundColor] = useStoreProp("showbackgroundColor");
    const [backgroundColor] = useStoreProp("backgroundColor");
    const [darkTheme] = useStoreProp("darkTheme");
    const [showFooter] = useStoreProp("showFooter");

    useOnRouteChange();

    return (
        <StrictMode>
            {darkTheme && <DarkTheme />}
            <Overlays />
            <FullPageOverlay />
            <Header />
            <Main
                hasGradient={showbackgroundColor}
                backgroundColor={backgroundColor}
                showFooter={showFooter}
                darkTheme={darkTheme}
            >
                <Background />
                {children}
            </Main>
            <Footer />
        </StrictMode>
    );
};
