import { PageProps } from "gatsby";
import { Layout } from "@layouts/default";
import { MainContainer } from "@components/main-container";
import { Header } from "@components/header";
import { Translate } from "@components/translate";
import { MainTitle } from "@components/main-title";
import { Logo } from "@components/logo";

/**
 * Component
 * @param props
 */
export default function About({ location }: PageProps) {
    return (
        <Layout>
            <Header location={location} Logo={Logo} hasSiteTitle={true} />
            <MainContainer className="lg:pt-20">
                <MainTitle>
                    <Translate id="about.title" />
                </MainTitle>
            </MainContainer>
        </Layout>
    );
}
