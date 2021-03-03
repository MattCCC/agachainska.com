import { Layout } from "@layouts/default";
import { Header } from "@components/header";
import { Translate } from "@components/translate";
import { MainTitle } from "@components/main-title";
import { PageProps } from "gatsby";

/**
 * Component
 * @param props
 */
export default function About({ location }: PageProps) {
    return (
        <Layout>
            <Header location={location} hasSiteTitle={true} />
            <MainTitle>
                <Translate id="about.title" />
            </MainTitle>
        </Layout>
    );
}
