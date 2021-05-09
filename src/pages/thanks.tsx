import { Fragment } from "react";

import { GridRow, MainContainer } from "@components/main-container";

export default function Thanks(): JSX.Element {
    return (
        <Fragment>
            <MainContainer topPadding={true}>
                <GridRow>
                    <h1 className="font-bold text-center prose-70 lg:prose-140">
                        Form submitted. Thank you.
                    </h1>
                </GridRow>
            </MainContainer>
        </Fragment>
    );
}
