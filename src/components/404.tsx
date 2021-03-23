import { Fragment } from "react";

import { Header } from "@components/header";
import { MainContainer } from "@components/main-container";
import { MainSection } from "@components/main-section";
import { Translate } from "@components/translate";

interface Props {
    params: Record<string, string>;
}

export function ErrorContainer({ params }: Props): JSX.Element {
    return (
        <Fragment>
            <Header />
            <MainSection className="grid grid-flow-col grid-cols-1 grid-rows-1 items-center">
                <MainContainer className="lg:pt-20">
                    <h1 className="text-center prose-140px font-bold">
                        <Translate id="page.notfound" />
                    </h1>
                </MainContainer>
            </MainSection>
        </Fragment>
    );
}
