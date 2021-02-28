import { css, styled } from "twin.macro";
import { Layout } from "@layouts/default";
import { Header } from "@components/header";
import { Translate } from "@components/translate"

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

export default function Contact() {
    return (
        <Layout>
            <Header />
            <Title><Translate id="contact.title" /></Title>
        </Layout>
    );
}
