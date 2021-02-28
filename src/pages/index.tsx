import { css, styled } from "twin.macro";
import { Layout } from "@layouts/default";
import { Header } from "@components/header";
import { Translate } from "@components/translate";

const Title = styled.h1(() => [
    css`
        height: 303px;
        width: 587px;
        color: #000000;
        font-family: Larsseit;
        font-size: 140px;
        font-weight: bold;
        letter-spacing: 0;
        line-height: 160px;
    `,
]);

const Desc = styled.h2(() => [
    css`
        height: 84px;
        width: 317px;
        color: #000000;
        font-family: Larsseit;
        font-size: 30px;
        letter-spacing: 0;
        line-height: 42px;
    `,
]);

export default function Home() {
    return (
        <Layout>
            <Header />
            <Title>
                <Translate id="home.title" />
            </Title>
            <Desc>
                <Translate id="home.description" />
            </Desc>
        </Layout>
    );
}
