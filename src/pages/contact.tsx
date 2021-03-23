import { Fragment } from "react";

import { Header } from "@components/header";
import { MainContainer } from "@components/main-container";
import { MainTitle } from "@components/main-title";
import { Translate } from "@components/translate";


/**
 * Component
 * @param props
 */
export default function Contact(): JSX.Element {
    return (
        <Fragment>
            <Header />
            <MainContainer className="lg:pt-20">
                <MainTitle>
                    <Translate id="contact.title" />
                </MainTitle>
            </MainContainer>
        </Fragment>
    );
}
