import tw, { css, styled } from "twin.macro";
import { Layout } from "@layouts/default";
import { MainContainer } from "@components/main-container";
import { Header } from "@components/header";
import { Translate } from "@components/translate";
import { PageProps } from "gatsby";
import { trackMousePosition } from "@hooks/track-mouse-position";
import { CSSProperties, RefObject, useRef } from "react";
import { Link } from "@components/translate";
import { getLinkProps } from "@utils/route";
import { translateText } from "@utils/translate-text";

/**
 * Styles
 */
const Section = styled.section(() => [
    tw`grid grid-flow-col grid-cols-1 grid-rows-1 items-center h-screen relative z-10`,
]);

const Title = styled.h1(() => [
    tw`inline-block md:mr-16`,
    css`
        max-height: 303px;
        width: 570px;
        max-width: 100%;
        font-size: 140px;
        font-weight: 700;
        line-height: 160px;
        user-select: none;
        position: relative;
        z-index: 50;
        color: var(--black-color);
        background: radial-gradient(
            40px circle at var(--x) var(--y),
            rgba(0, 0, 0, 0) 100%,
            var(--black-color)
        );
        background-clip: text;
        -webkit-text-fill-color: transparent;
        cursor: none;

        &:before {
            position: absolute;
            top: 0;
            left: 0;
            content: attr(data-text);
            color: var(--white-color);
            clip-path: circle(40px at var(--x, -100%) var(--y, -100%));
            -webkit-text-stroke-width: 1px;
            -webkit-text-stroke-color: rgba(0, 0, 0, 0.8);
        }

        &:hover + .cursor {
            background-color: transparent;
            color: transparent;
            cursor: none;
        }
    `,
]);

const Desc = styled.h2(() => [
    tw`inline-block`,
    css`
        max-height: 84px;
        width: 18rem;
        max-width: 100%;
        font-size: 30px;
        line-height: 42px;
    `,
]);

const Cursor = styled.div(() => [
    tw`fixed text-white text-center uppercase`,
    css`
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background-color: var(--black-color);
        border: 1px solid var(--black-color);
        transform: translate(-50%, -50%);
        font-size: 12px;
        padding: 24px 22px;
        cursor: none;
        user-select: none;

        a {
            cursor: none;
        }
    `,
]);

/**
 * Component
 * @param props
 */
export default function Home({ location }: PageProps) {
    const titleRef = useRef() as RefObject<HTMLHeadingElement>;
    const { x, y, clientX, clientY } = trackMousePosition(titleRef);
    const titleStyle = { "--x": `${x}px`, "--y": `${y}px` } as CSSProperties;
    const cursorStyle = {
        left: `${clientX}px`,
        top: `${clientY}px`,
    } as CSSProperties;

    return (
        <Layout>
            <Header location={location} />
            <Section>
                <MainContainer>
                    <Title
                        data-text={translateText("home.title")}
                        style={titleStyle}
                        ref={titleRef}
                    >
                        <Translate id="home.title" />
                    </Title>
                    <Cursor style={cursorStyle} className="cursor">
                        <Link {...getLinkProps("work", location)}>
                            <Translate id="viewWork" />
                        </Link>
                    </Cursor>
                    <Desc>
                        <Translate id="home.description" />
                    </Desc>
                </MainContainer>
            </Section>
        </Layout>
    );
}
