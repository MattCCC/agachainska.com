import "./src/styles/global.scss";
import { Fragment } from "react";

import { WrapRootElementNodeArgs } from "gatsby";
import { IntlContextProvider, IntlProvider } from "gatsby-plugin-intl";
import { ParallaxProvider } from "react-scroll-parallax";

import { Layout } from "layouts/default";
import { LocationProvider } from "@reach/router";
import { globalStore } from "store/index";
import messages from "translations/en.json";
import React from "react";

const locales = ["en"];
const intlConfig = {
    language: "en",
    languages: locales,
    messages,
    defaultLanguage: "en",
    redirect: false,
};

export const wrapRootElement = ({ element }: WrapRootElementNodeArgs) => (
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
