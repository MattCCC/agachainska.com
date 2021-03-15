import { MainContainer } from "@components/main-container";
import { Header } from "@components/header";
import { Translate } from "@components/translate";
import { MainTitle } from "@components/main-title";
import { Fragment } from "react";

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
