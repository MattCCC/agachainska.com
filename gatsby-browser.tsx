import "./src/styles/global.scss";
import { Fragment } from "react";

import { WrapRootElementNodeArgs } from "gatsby";
import { ParallaxProvider } from "react-scroll-parallax";

import { TopOverlay } from "@components/overlays";
import { Layout } from "@layouts/default";
import { LocationProvider } from "@reach/router";
import { globalStore } from "@store/index";

export const wrapRootElement = ({
    element,
}: WrapRootElementNodeArgs): JSX.Element => (
    <Fragment>
        <TopOverlay />
        <ParallaxProvider>
            <LocationProvider>
                <globalStore.Provider>
                    <Layout>{element}</Layout>
                </globalStore.Provider>
            </LocationProvider>
        </ParallaxProvider>
    </Fragment>
);
