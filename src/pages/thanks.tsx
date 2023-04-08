import { Fragment } from "react";

import { GetStaticProps } from "next";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { MainContainer } from "components/main-container";
import { Meta } from "components/meta";

export default function Thanks() {
    return (
        <Fragment>
            <MainContainer topPadding={true}>
                <div tw="col-start-1 col-end-13">
                    <h1 className="font-bold text-center prose-70 leading-20 lg:prose-140 lg:leading-38">
                        Form submitted. Thank you.
                    </h1>
                </div>
            </MainContainer>
        </Fragment>
    );
}

export const getStaticProps: GetStaticProps = async ({ locale = "en" }) => ({
    props: {
        ...(await serverSideTranslations(locale)),
    },
});

export const Head = () => <Meta title="Thank you - Aga Chainska" />;
