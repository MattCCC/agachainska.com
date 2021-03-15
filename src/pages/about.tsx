import { Fragment } from "react";
import { MainContainer } from "@components/main-container";
import { Header } from "@components/header";
import { Translate } from "@components/translate";
import { MainTitle } from "@components/main-title";

/**
 * Component
 * @param props
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
