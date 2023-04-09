import { GetStaticProps, NextPage } from "next";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { ErrorContainer } from "components/404";
import { Meta } from "components/meta";

const ErrorPage: NextPage = () => (
    <>
        <Meta title="404 - Aga Chainska" />
        <ErrorContainer />
    </>
);

export default ErrorPage;

export const getStaticProps: GetStaticProps = async ({ locale = "en" }) => ({
    props: {
        ...(await serverSideTranslations(locale)),
    },
});
