import { Fragment, FunctionComponent, ReactElement } from "react";

import tw, { styled, css } from "twin.macro";

import { Background } from "@components/background";
import { Footer } from "@components/footer";
import { FullPageOverlay } from "@components/full-page-overlay";
import { Header } from "@components/header";
import { Overlays } from "@components/overlays";
import { TopOverlay } from "@components/overlays";
import { Global } from "@emotion/react";
import { useOnRouteChange } from "@hooks/use-on-route-change";
import { useStoreProp } from "@store/index";
import { up } from "@utils/screens";

interface Props {
    hasGradient: boolean;
    showFooter: boolean;
    darkTheme: boolean;
}

const footerHeight = `${690 + 120}px`;

const DarkTheme = (): ReactElement => (
    <Global
        styles={css`
            :root {
                --primary-color: #fff;
                --tertiary-color: #0b0b0b;
            }
        `}
    />
);

const Main = styled.main(({ hasGradient, showFooter, darkTheme }: Props) => [
    tw`relative z-10 w-full h-full min-h-screen text-primary-color`,
    css`
        backface-visibility: hidden;
    `,
    showFooter &&
        css`
            ${up("lg")} {
                margin-bottom: ${footerHeight};
            }
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
    !hasGradient && !darkTheme && tw`bg-white`,
    darkTheme && tw`bg-black`,
]);

export const Layout: FunctionComponent<unknown> = ({ children }) => {
    const [showBackgroundGradient] = useStoreProp("showBackgroundGradient");
    const [darkTheme] = useStoreProp("darkTheme");
    const [showFooter] = useStoreProp("showFooter");

    useOnRouteChange();

    return (
        <Fragment>
            <div id="internal-announcer"></div>
            {darkTheme && <DarkTheme />}
            <TopOverlay />
            <Overlays />
            <FullPageOverlay />
            <Header />
            <Main
                hasGradient={showBackgroundGradient}
                showFooter={showFooter}
                darkTheme={darkTheme}
            >
                <Background />
                {children}
            </Main>
            <Footer />
        </Fragment>
    );
};
