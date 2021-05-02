import { Fragment } from "react";

import { GridRow, MainContainer } from "@components/main-container";
import { MainSection } from "@components/main-section";

export default function Contact(): JSX.Element {
    return (
        <Fragment>
            <MainSection className="grid items-center grid-flow-col grid-cols-1 grid-rows-1">
                <MainContainer>
                    <GridRow>
                        <h1 className="font-bold text-center prose-70 lg:prose-140">
                            Coming Soon
                        </h1>
                    </GridRow>
                </MainContainer>
            </MainSection>
        </Fragment>
    );
}
