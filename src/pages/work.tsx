import { PageProps } from "gatsby";
import { Layout } from "@layouts/default";
import { MainContainer } from "@components/main-container";
import { Header } from "@components/header";
import { MainTitle } from "@components/main-title";
import { Translate } from "@components/translate";

/**
 * Component
 * @param props
 */
export default function Work({ location }: PageProps): JSX.Element {
    return (
        <Layout>
            <Header location={location} />
            <MainContainer className="lg:pt-20">
                <MainTitle>
                    <Translate id="work.title" />
                </MainTitle>
            </MainContainer>
        </Layout>
    );
}
