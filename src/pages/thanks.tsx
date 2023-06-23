import { Fragment } from "react";

import { GetStaticProps } from "next";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { MainContainer } from "components/main-container";
import { Meta } from "components/meta";

export default function Thanks() {
    return (
        <Fragment>
            <Meta title="Thank you · Aga Chainska" />

            <MainContainer topPadding={true}>
                <div tw="col-start-1 col-end-13">
                    <h1 className="font-bold text-center text-[70px] leading-20 lg:text-[140px] lg:leading-38">
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
