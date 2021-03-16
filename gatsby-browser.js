import "./src/styles/global.css";
import { globalStore } from "./src/store/index";
import { pageOverlayTopVariants } from "@config/animation-variants";
import { motion } from "@components/animation";
import { Layout } from "@layouts/default";
import { LocationProvider } from "@reach/router";

export const wrapRootElement = ({ element }) => {
    return (
        <motion.div
            initial="initial"
            animate="enter"
            exit="exitHome"
            variants={pageOverlayTopVariants}
        >
            <LocationProvider>
                <globalStore.Provider>
                    <Layout>{element}</Layout>
                </globalStore.Provider>
            </LocationProvider>
        </motion.div>
    );
};
