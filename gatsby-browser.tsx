import "./src/styles/global.scss";
import { Fragment } from "react";

import { WrapRootElementNodeArgs } from "gatsby";
import { ParallaxProvider } from "react-scroll-parallax";

import { motion } from "@components/animation";
import { pageOverlayTopVariants } from "@config/animation-variants";
import { Layout } from "@layouts/default";
import { LocationProvider } from "@reach/router";

import { globalStore } from "./src/store/index";

export const wrapRootElement = ({
    element,
}: WrapRootElementNodeArgs): JSX.Element => (
    <Fragment>
        <motion.div
            className="relative z-100 bg-white"
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageOverlayTopVariants}
        />
        <ParallaxProvider>
            <LocationProvider>
                <globalStore.Provider>
                    <Layout>{element}</Layout>
                </globalStore.Provider>
            </LocationProvider>
        </ParallaxProvider>
    </Fragment>
);
