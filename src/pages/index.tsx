import tw, { css, styled } from "twin.macro";
import { Layout } from "@layouts/default";
import { Header } from "@components/header";
import { Translate } from "@components/translate";

/**
 * Styles
 */
const Section = styled.section(() => [
    tw`grid grid-flow-col grid-cols-1 grid-rows-1 items-center h-screen relative z-10`,
]);

const Title = styled.h1(() => [
    tw`inline-block`,
    css`
        max-height: 303px;
        width: 45rem;
        max-width: 100%;
        color: #000000;
        font-size: 140px;
        font-weight: 700;
        line-height: 160px;
    `,
]);

const Desc = styled.h2(() => [
    tw`inline-block`,
    css`
        max-height: 84px;
        width: 18rem;
        max-width: 100%;
        color: #000000;
        font-size: 30px;
        line-height: 42px;
    `,
]);

/**
 * Component
 * @param props
 */
export default function Home() {
    return (
        <Layout>
            <Header />
            <Section>
                <div className="container mx-auto">
                    <Title>
                        <Translate id="home.title" />
                    </Title>
                    <Desc>
                        <Translate id="home.description" />
                    </Desc>
                </div>
            </Section>
        </Layout>
    );
}
