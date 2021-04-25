import { Fragment } from "react";

import { MainContainer } from "@components/main-container";
import { SectionMainTitle } from "@components/main-title";
import { Translate } from "@components/translate";

export default function Contact(): JSX.Element {
    return (
        <Fragment>
            <MainContainer className="lg:pt-20">
                <SectionMainTitle percentage={0}>
                    <Translate id="contact.title" />
                </SectionMainTitle>
            </MainContainer>
        </Fragment>
    );
}
