import { Fragment } from "react";

import { Header } from "@components/header";
import { MainContainer } from "@components/main-container";
import { SectionMainTitle } from "@components/main-title";
import { Translate } from "@components/translate";

/**
 * Component
 */
export default function Contact(): JSX.Element {
    return (
        <Fragment>
            <Header />
            <MainContainer className="lg:pt-20">
                <SectionMainTitle percentage={0}>
                    <Translate id="contact.title" />
                </SectionMainTitle>
            </MainContainer>
        </Fragment>
    );
}
