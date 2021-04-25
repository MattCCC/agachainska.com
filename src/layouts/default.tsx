import { Fragment, FunctionComponent } from "react";

import tw, { styled, css } from "twin.macro";

import { Background } from "@components/background";
import { Footer } from "@components/footer";
import { FullPageOverlay } from "@components/full-page-overlay";
import { Header } from "@components/header";
import { Overlays } from "@components/overlays";
import { useOnRouteChange } from "@hooks/use-on-route-change";
import { useStoreProp } from "@store/index";
import { up } from "@utils/screens";

interface Props {
    hasGradient: boolean;
    showFooter: boolean;
}

const footerHeight = `${690 + 120}px`;

const Main = styled.main(({ hasGradient, showFooter }: Props) => [
    tw`relative h-full w-full min-h-screen text-primary-color z-10`,
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
    !hasGradient && tw`bg-white`,
]);

export const Layout: FunctionComponent<unknown> = ({ children }) => {
    const [showBackgroundGradient] = useStoreProp("showBackgroundGradient");
    const [showFooter] = useStoreProp("showFooter");

    useOnRouteChange();

    return (
        <Fragment>
            <Overlays />
            <FullPageOverlay />
            <Header />
            <Main hasGradient={showBackgroundGradient} showFooter={showFooter}>
                <Background />
                {children}
            </Main>
            <Footer />
        </Fragment>
    );
};
