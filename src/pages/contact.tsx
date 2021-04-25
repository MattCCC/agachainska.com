import { Fragment } from "react";

import { MainContainer } from "@components/main-container";
import { MainSection } from "@components/main-section";

export default function Contact(): JSX.Element {
    return (
        <Fragment>
            <MainSection className="grid grid-flow-col grid-cols-1 grid-rows-1 items-center">
                <MainContainer className="lg:pt-20">
                    <h1 className="text-center prose-140 font-bold">
                        Coming Soon
                    </h1>
                </MainContainer>
            </MainSection>
        </Fragment>
    );
}
