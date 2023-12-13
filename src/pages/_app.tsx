import "../styles/global.scss";

import { PropsWithChildren, StrictMode } from "react";

import tw, { styled, css } from "twin.macro";

import { AppProps } from "next/app";

import { Background } from "components/background";
import { Footer } from "components/footer";
import { FullPageOverlay } from "components/full-page-overlay";
import { Header } from "components/header";
import Overlays from "components/overlays";
import { useOnRouteChange } from "hooks/use-on-route-change";
import { useStoreProp, Provider as GlobalStoreProvider } from "store/index";

interface Props {
    hasGradient: boolean;
    showFooter: boolean;
    backgroundColor: string;
    darkTheme: boolean;
}

const Main = styled.main(
    ({ hasGradient, backgroundColor, showFooter, darkTheme }: Props) => [
        tw`relative z-10 w-full h-full min-h-screen text-primary pt-safe-top`,
        tw`[backface-visibility: hidden]`,
        showFooter && tw`lg:mb-[810px]`,
        darkTheme && !showFooter && tw`pb-[140px] lg:pb-[120px]`,
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
    const [showPageWhiteGradient] = useStoreProp("showPageWhiteGradient");
    const [isSingleProject] = useStoreProp("isSingleProject");
    const [workPageBackgroundColor] = useStoreProp("workPageBackgroundColor");
    const [projectPageBackgroundColor] = useStoreProp(
        "projectPageBackgroundColor"
    );
    const [darkTheme] = useStoreProp("darkTheme");
    const [showFooter] = useStoreProp("showFooter");

    useOnRouteChange();

    return (
        <StrictMode>
            {darkTheme && (
                <style>{`
                    :root {
                        --primary: #fff;
                        --tertiary: #0b0b0b;
                    }
                `}</style>
            )}
            <FullPageOverlay />
            <div
                id="page-container"
                style={{
                    position: "relative",
                    transform: "translateY(100%)",
                }}
            >
                <Header />
                <Main
                    hasGradient={showPageWhiteGradient}
                    backgroundColor={
                        isSingleProject
                            ? projectPageBackgroundColor
                            : workPageBackgroundColor
                    }
                    showFooter={showFooter}
                    darkTheme={darkTheme}
                >
                    <Background />
                    {children}
                </Main>
            </div>
            <Footer />
        </StrictMode>
    );
};

function App({ Component, pageProps }: AppProps) {
    return (
        <GlobalStoreProvider>
            <Overlays />
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </GlobalStoreProvider>
    );
}

export default App;
