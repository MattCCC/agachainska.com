import {
    CSSProperties,
    Fragment,
    RefObject,
    useCallback,
    useRef,
    useState,
} from "react";
import tw, { css, styled } from "twin.macro";
import { PageProps, navigate } from "gatsby";
import { Layout } from "@layouts/default";
import { MainContainer } from "@components/main-container";
import { Header } from "@components/header";
import { CountDown } from "@components/count-down";
import { Translate } from "@components/link";
import { Link } from "@components/link";
import { BottomCircle } from "@components/bottom-circle";
import { getRoutePath } from "@utils/route";
import { TranslateText } from "@utils/translate-text";
import { isDev } from "@utils/detect-env";
import { MotionCursor } from "@components/motion-cursor";
import { Store } from "@store/index";
import { motion } from "@components/animation";
import { MainSection } from "@components/main-section";
import { useLockBodyScroll } from "@hooks/lock-body-scroll";
import {
    pageContentVariants,
    pageOverlayTopVariants,
} from "@config/animation-variants";

/**
 * Styles
 */
const Title = styled.h1(() => [
    tw`relative z-50 inline-block max-w-full lg:mr-16 font-bold prose-70px lg:prose-140px select-none`,
    css`
        width: 570px;
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

        &:hover + a .cursor {
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

/**
 * Component
 * @param props
 */
export default function Home({ location }: PageProps): JSX.Element {
    const titleRef = useRef() as RefObject<HTMLHeadingElement>;
    const workLink = getRoutePath("work");
    const defaultState = { x: 0, y: 0 };
    const [position, setPosition] = useState(defaultState);
    const titleStyle = {
        "--x": `${position.x}px`,
        "--y": `${position.y}px`,
    } as CSSProperties;

    useLockBodyScroll();

    const onPositionUpdate = useCallback(
        (clientX: number, clientY: number) => {
            const clientRect = (titleRef.current as HTMLHeadingElement).getBoundingClientRect();
            const cursorMarginLeft = 31;

            setPosition({
                x: clientX - clientRect.left - cursorMarginLeft,
                y: clientY - clientRect.top,
            });
        },
        [titleRef]
    );

    const onCountDownFinished = useCallback(() => {
        if (!isDev()) {
            navigate(workLink.to);
        }
    }, [workLink]);

    return (
        <Fragment>
            <motion.div
                initial="initial"
                animate="enter"
                exit="exitHome"
                variants={pageOverlayTopVariants}
            >
                <Store>
                    <Layout>
                        <Header showLogoOnDesktop={false} />
                        <MainSection
                            className="grid grid-flow-col grid-cols-1 grid-rows-1 items-center"
                            initial="exit"
                            animate="enter"
                            exit="exit"
                            variants={pageContentVariants}
                        >
                            <MainContainer>
                                <Title
                                    data-text={TranslateText("home.title")}
                                    style={titleStyle}
                                    ref={titleRef}
                                >
                                    <Translate id="home.title" />
                                </Title>
                                <Link {...workLink}>
                                    <MotionCursor
                                        onPositionUpdate={onPositionUpdate}
                                    >
                                        <Translate id="viewWork" />
                                    </MotionCursor>
                                </Link>
                                <Desc>
                                    <Translate id="home.description" />
                                </Desc>
                            </MainContainer>
                        </MainSection>
                        <BottomCircle />
                        <CountDown
                            seconds={10}
                            onFinishedCallback={onCountDownFinished}
                        />
                    </Layout>
                </Store>
            </motion.div>
        </Fragment>
    );
}
