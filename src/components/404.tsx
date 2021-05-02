import { Fragment } from "react";

import { MainContainer } from "@components/main-container";
import { MainSection } from "@components/main-section";
import { Translate } from "@components/translate";

interface Props {
    params: Record<string, string>;
}

export function ErrorContainer({ params }: Props): JSX.Element {
    return (
        <Fragment>
            <MainSection className="grid items-center grid-flow-col grid-cols-1 grid-rows-1">
                <MainContainer topPadding={true}>
                    <h1 className="font-bold text-center prose-140">
                        <Translate id="page.notfound" />
                    </h1>
                </MainContainer>
            </MainSection>
        </Fragment>
    );
}
