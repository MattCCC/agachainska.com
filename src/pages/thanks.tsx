import { Fragment } from "react";

import { GridRow, MainContainer } from "@components/main-container";
import { Meta } from "@components/meta";

export default function Thanks() {
    return (
        <Fragment>
            <MainContainer topPadding={true}>
                <GridRow>
                    <h1 className="font-bold text-center prose-70 leading-20 lg:prose-140 lg:leading-38">
                        Form submitted. Thank you.
                    </h1>
                </GridRow>
            </MainContainer>
        </Fragment>
    );
}

export const Head = () => <Meta title="Thank you - Aga Chainska" />;
