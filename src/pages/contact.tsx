import { Layout } from "@layouts/default";
import { MainContainer } from "@components/main-container";
import { Header } from "@components/header";
import { Translate } from "@components/translate";
import { MainTitle } from "@components/main-title";

/**
 * Component
 * @param props
 */
export default function Contact(): JSX.Element {
    return (
        <Layout>
            <Header />
            <MainContainer className="lg:pt-20">
                <MainTitle>
                    <Translate id="contact.title" />
                </MainTitle>
            </MainContainer>
        </Layout>
    );
}
