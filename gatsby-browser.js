import "./src/styles/global.css";
import { Fragment } from "react";
import { globalStore } from "./src/store/index";
import { pageOverlayTopVariants } from "@config/animation-variants";
import { motion } from "@components/animation";
import { Layout } from "@layouts/default";
import { LocationProvider } from "@reach/router";

export const wrapRootElement = ({ element }) => {
    return (
        <Fragment>
            <motion.div className="relative z-100 bg-white"
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
};
