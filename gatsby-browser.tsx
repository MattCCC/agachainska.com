import "./src/styles/global.css";
import { Fragment } from "react";
import { pageOverlayTopVariants } from "@config/animation-variants";
import { motion } from "@components/animation";
import { Layout } from "@layouts/default";
import { LocationProvider } from "@reach/router";
import { WrapRootElementNodeArgs } from "gatsby";
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
        <LocationProvider>
            <globalStore.Provider>
                <Layout>{element}</Layout>
            </globalStore.Provider>
        </LocationProvider>
    </Fragment>
);
