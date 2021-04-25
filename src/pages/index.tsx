import {
    CSSProperties,
    Fragment,
    RefObject,
    useCallback,
    useRef,
    useState,
} from "react";
import { useEffect, useMemo } from "react";

import { navigate } from "gatsby";
import tw, { css, styled } from "twin.macro";

import { BottomCircle } from "@components/bottom-circle";
import { CountDown } from "@components/count-down";
import { MainContainer } from "@components/main-container";
import { MainSection } from "@components/main-section";
import { MotionCursor } from "@components/motion-cursor";
import { pageContentVariants } from "@components/overlays";
import { Translate } from "@components/translate";
import { useLockBodyScroll } from "@hooks/use-lock-body-scroll";
import { useStore } from "@store/index";
import { isDev } from "@utils/detect-env";
import { getRoutePath } from "@utils/route";
import { TranslateText } from "@utils/translate-text";

const Title = styled.h1(() => [
    tw`relative z-50 inline-block max-w-full lg:pr-16 font-bold prose-70px lg:prose-140px select-none`,
    tw`text-black bg-clip-text`,
    css`
        width: 634px;
        font-family: "Larsseit-Bold";
        background-image: radial-gradient(
            40px circle at var(--x) var(--y),
            rgba(0, 0, 0, 0) 100%,
            var(--black-color)
        );
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
    tw`inline-block prose-24px lg:prose-30px select-none`,
    css`
        max-height: 84px;
        width: 18rem;
        max-width: 100%;
        line-height: 42px;
    `,
]);

export default function Home(): JSX.Element {
    const titleRef = useRef() as RefObject<HTMLHeadingElement>;
    const workLink = getRoutePath("work");
    const defaultState = useMemo(() => ({ x: 0, y: 0 }), []);
    const [, dispatch] = useStore();
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

    useEffect(() => {
        dispatch.showMotionCursor(true, {
            text: "viewWork",
            route: workLink.to,
        });
    }, [dispatch, workLink.to]);

    return (
        <Fragment>
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
                    <MotionCursor onPositionUpdate={onPositionUpdate} />
                    <Desc>
                        <Translate id="home.description" />
                    </Desc>
                </MainContainer>
            </MainSection>
            <BottomCircle />
            <CountDown seconds={10} onFinishedCallback={onCountDownFinished} />
        </Fragment>
    );
}
