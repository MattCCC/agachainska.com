import { PageProps } from "gatsby";
import { Layout } from "@layouts/default";
import { MainContainer } from "@components/main-container";
import { Header } from "@components/header";
import { Translate } from "@components/link";
import { MainTitle } from "@components/main-title";

/**
 * Component
 * @param props
 */
export default function About({ location }: PageProps): JSX.Element {
    return (
        <Layout>
            <Header />
            <MainContainer className="lg:pt-20">
                <MainTitle>
                    <Translate id="about.title" />
                </MainTitle>
            </MainContainer>
        </Layout>
    );
}
