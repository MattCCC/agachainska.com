import { CSSProperties, RefObject, useRef } from "react";
import tw, { css, styled } from "twin.macro";
import { PageProps, navigate } from "gatsby";
import { Layout } from "@layouts/default";
import { MainContainer } from "@components/main-container";
import { Header } from "@components/header";
import { CountDown } from "@components/count-down";
import { Translate } from "@components/translate";
import { Link } from "@components/translate";
import { trackMousePosition } from "@hooks/track-mouse-position";
import { getRoutePath } from "@utils/route";
import { translateText } from "@utils/translate-text";

/**
 * Styles
 */
const Section = styled.section(() => [
    tw`grid grid-flow-col grid-cols-1 grid-rows-1 items-center h-screen relative z-10`,
]);

const Title = styled.h1(() => [
    tw`relative z-50 inline-block max-w-full lg:mr-16 font-bold prose-70px lg:prose-140px`,
    css`
        width: 570px;
        user-select: none;
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
    tw`inline-block prose-24px lg:prose-30px`,
    css`
        max-height: 84px;
        width: 18rem;
        max-width: 100%;
        line-height: 42px;
    `,
]);

const Cursor = styled.div(() => [
    tw`fixed text-white text-center uppercase z-40 rounded-full`,
    css`
        width: 80px;
        height: 80px;
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
    const workLink = getRoutePath("work");
    const { x, y, clientX, clientY } = trackMousePosition(titleRef);
    const titleStyle = { "--x": `${x}px`, "--y": `${y}px` } as CSSProperties;
    const cursorWidth = 80;
    const cursorStyle = {
        left: `${clientX || -cursorWidth}px`,
        top: `${clientY || -cursorWidth}px`,
    } as CSSProperties;

    return (
        <Layout>
            <Header location={location} showLogoOnDesktop={false} />
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
                        <Link {...workLink}>
                            <Translate id="viewWork" />
                        </Link>
                    </Cursor>
                    <Desc>
                        <Translate id="home.description" />
                    </Desc>
                    <CountDown
                        seconds={10}
                        onFinishedCallback={() => {
                            navigate(workLink.to);
                        }}
                    />
                </MainContainer>
            </Section>
        </Layout>
    );
}
