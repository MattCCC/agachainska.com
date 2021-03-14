import { Layout } from "@layouts/default";
import { Header } from "@components/header";
import { MainTitle } from "@components/main-title";
import { Translate } from "@components/translate";

/**
 * Component
 * @param props
 */
export default function ProjectRemax(): JSX.Element {
    return (
        <Layout>
            <Header />
            <MainTitle>
                <Translate id="work.remax.title" />
            </MainTitle>
        </Layout>
    );
}
