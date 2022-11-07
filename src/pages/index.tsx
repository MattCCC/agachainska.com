import {
    CSSProperties,
    Fragment,
    RefObject,
    useCallback,
    useRef,
    useState,
    useEffect,
    useMemo,
} from "react";

import { navigate } from "gatsby";
import tw, { css, styled } from "twin.macro";

import { BottomCircle } from "components/bottom-circle";
import { CountDown } from "components/count-down";
import { GridRow, MainContainer } from "components/main-container";
import { MainSection } from "components/main-section";
import { Meta } from "components/meta";
import { MotionCursor } from "components/motion-cursor";
import { pageContentVariants } from "components/overlays";
import { Translate } from "components/translate";
import { useLockBodyScroll } from "hooks/use-lock-body-scroll";
import { useStoreProp } from "store/index";
import { isDev } from "utils/detect-env";
import { getRoutePath } from "utils/route";
import { TranslateText } from "utils/translate-text";

const Title = styled.h1(() => [
    tw`relative z-50 inline-block max-w-full -mt-16 font-bold select-none lg:pr-16 prose-70 leading-20 lg:prose-140 lg:leading-38`,
    tw`subpixel-antialiased text-black bg-clip-text font-fbold cursor-none`,
    css`
        width: 634px;
        background-image: radial-gradient(
            40px circle at var(--x) var(--y),
            rgba(0, 0, 0, 0) 100%,
            var(--black)
        );
        -webkit-text-fill-color: transparent;

        &:before {
            ${tw`absolute top-0 left-0 text-white`}
            content: attr(data-text);
            clip-path: circle(40px at var(--x, -100%) var(--y, -100%));
            -webkit-text-stroke-width: 1px;
            -webkit-text-stroke-color: rgba(0, 0, 0, 0.8);
        }

        &:hover + .cursor {
            ${tw`text-transparent bg-transparent cursor-none`}
        }
    `,
]);

const Desc = styled.h2(() => [
    tw`inline-block leading-8 select-none prose-24 lg:prose-30 lg:leading-11`,
    css`
        max-height: 84px;
        width: 18rem;
        max-width: 100%;
    `,
]);

export default function Home() {
    const titleRef = useRef() as RefObject<HTMLHeadingElement>;
    const workLink = getRoutePath("work");
    const defaultState = useMemo(() => ({ x: 0, y: 0 }), []);
    const [, { showMotionCursor }] = useStoreProp("showMotionCursor");
    const [position, setPosition] = useState(defaultState);
    const titleStyle = {
        "--x": `${position.x}px`,
        "--y": `${position.y}px`,
    } as CSSProperties;

    useLockBodyScroll();

    const onPositionUpdate = useCallback(
        (clientX: number, clientY: number) => {
            const clientRect = (
                titleRef.current as HTMLHeadingElement
            ).getBoundingClientRect();
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

    useEffect(() => {
        showMotionCursor(true, {
            text: "viewWork",
            route: workLink.to,
        });
    }, [showMotionCursor, workLink.to]);

    return (
        <Fragment>
            <MainSection
                className="grid items-center grid-flow-col grid-cols-1 grid-rows-1 cursor-none"
                initial="exit"
                animate="enter"
                exit="exit"
                variants={pageContentVariants}
            >
                <MainContainer>
                    <GridRow>
                        <Title
                            data-text={TranslateText("home.title")}
                            style={titleStyle}
                            ref={titleRef}
                        >
                            <Translate id="home.title" />
                        </Title>
                        <MotionCursor onPositionUpdate={onPositionUpdate} />
                        <Desc>
                            <Translate id="home.description" />
                        </Desc>
                    </GridRow>
                </MainContainer>
            </MainSection>
            <BottomCircle />
            <CountDown seconds={10} onFinishedCallback={onCountDownFinished} />
        </Fragment>
    );
}

export const Head = () => <Meta title="Aga Chainska" />;
