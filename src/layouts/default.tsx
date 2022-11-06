import { Fragment, PropsWithChildren } from "react";

import tw, { styled, css } from "twin.macro";

import { Global } from "@emotion/react";
import { Background } from "components/background";
import { Footer } from "components/footer";
import { FullPageOverlay } from "components/full-page-overlay";
import { Header } from "components/header";
import { Overlays, TopOverlay } from "components/overlays";
import { useOnRouteChange } from "hooks/use-on-route-change";
import { useStoreProp } from "store/index";
import { up } from "utils/screens";

interface Props {
    hasGradient: boolean;
    showFooter: boolean;
    backgroundColor: string;
    darkTheme: boolean;
}

const footerHeight = `${690 + 120}px`;

const DarkTheme = () => (
    <Global
        styles={css`
            :root {
                --primary: #fff;
                --tertiary: #0b0b0b;
            }
        `}
    />
);

const Main = styled.main(
    ({ hasGradient, backgroundColor, showFooter, darkTheme }: Props) => [
        tw`relative z-10 w-full h-full min-h-screen text-primary`,
        css`
            backface-visibility: hidden;
        `,
        showFooter &&
            css`
                ${up("lg")} {
                    margin-bottom: ${footerHeight};
                }
            `,
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
        <Fragment>
            <div id="internal-announcer"></div>
            {darkTheme && <DarkTheme />}
            <TopOverlay />
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
        </Fragment>
    );
};
