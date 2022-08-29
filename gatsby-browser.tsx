import "./src/styles/global.scss";
import { Fragment } from "react";

import { WrapRootElementNodeArgs } from "gatsby";
import { IntlContextProvider, IntlProvider } from "gatsby-plugin-intl";
import { ParallaxProvider } from "react-scroll-parallax";

import { LocationProvider } from "@reach/router";

import { Layout } from "@layouts/default";
import { globalStore } from "@store/index";
import messages from "@translations/en.json";

const locales = ["en"];
const intlConfig = {
    language: "en",
    languages: locales,
    messages,
    defaultLanguage: "en",
    redirect: false,
};

export const wrapRootElement = ({
    element,
}: WrapRootElementNodeArgs): JSX.Element => (
    <Fragment>
        <ParallaxProvider>
            <LocationProvider>
                <globalStore.Provider>
                    <IntlContextProvider value={intlConfig}>
                        <IntlProvider locale="en" messages={messages}>
                            <Layout>{element}</Layout>
                        </IntlProvider>
                    </IntlContextProvider>
                </globalStore.Provider>
            </LocationProvider>
        </ParallaxProvider>
    </Fragment>
);
