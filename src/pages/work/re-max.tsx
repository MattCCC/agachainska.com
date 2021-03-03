import { Layout } from "@layouts/default";
import { Header } from "@components/header";
import { MainTitle } from "@components/main-title";
import { Translate } from "@components/translate";
import { PageProps } from "gatsby";

/**
 * Component
 * @param props
 */
export default function ProjectRemax({ location }: PageProps) {
    return (
        <Layout>
            <Header location={location} hasSiteTitle={true} />
            <MainTitle>
                <Translate id="work.remax.title" />
            </MainTitle>
        </Layout>
    );
}
