import { Fragment } from "react";

import { Header } from "@components/header";
import { MainContainer } from "@components/main-container";
import { MainTitle } from "@components/main-title";
import { Translate } from "@components/translate";

/**
 * Component
 */
export default function About(): JSX.Element {
    return (
        <Fragment>
            <Header />
            <MainContainer className="lg:pt-20">
                <MainTitle>
                    <Translate id="about.title" />
                </MainTitle>
            </MainContainer>
        </Fragment>
    );
}
