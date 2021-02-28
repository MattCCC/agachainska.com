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
    tw`md:px-28 inline-block`,
    css`
        max-height: 303px;
        width: 40rem;
        max-width: 100%;
        color: #000000;
        font-family: Larsseit;
        font-size: 140px;
        font-weight: bold;
        line-height: 160px;
    `,
]);

const Desc = styled.h2(() => [
    tw`md:px-28 inline-block`,
    css`
        max-height: 84px;
        width: 35rem;
        max-width: 100%;
        color: #000000;
        font-family: Larsseit;
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
                <div>
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
