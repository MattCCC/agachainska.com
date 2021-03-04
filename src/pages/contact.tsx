import { Layout } from "@layouts/default";
import { MainContainer } from "@components/main-container";
import { Header } from "@components/header";
import { Translate } from "@components/translate";
import { MainTitle } from "@components/main-title";
import { PageProps } from "gatsby";

/**
 * Component
 * @param props
 */
export default function Contact({ location }: PageProps) {
    return (
        <Layout>
            <Header location={location} hasSiteTitle={true} />
            <MainContainer className="md:pt-20">
                <MainTitle>
                    <Translate id="contact.title" />
                </MainTitle>
            </MainContainer>
        </Layout>
    );
}
