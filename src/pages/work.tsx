import { PageProps } from "gatsby";
import { Layout } from "@layouts/default";
import { MainContainer } from "@components/main-container";
import { Header } from "@components/header";
import { MainTitle } from "@components/main-title";
import { Translate } from "@components/translate";
import { Timeline } from "@components/timeline";

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
                    <Timeline
                        sections={[
                            {
                                title: "UX",
                                items: [],
                            },
                            {
                                title: "UI",
                                isActive: true,
                                items: [
                                    { name: "RE/MAX", isActive: true },
                                    { name: "Addidas" },
                                    { name: "Nike" },
                                    { name: "Pepsi" },
                                    { name: "Topshop" },
                                ],
                            },
                            {
                                title: "Illustrations",
                                items: [],
                            },
                        ]}
                    />
                </MainTitle>
            </MainContainer>
        </Layout>
    );
}
