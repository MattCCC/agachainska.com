import {
    useMemo,
    useState,
    CSSProperties,
    useCallback,
    useRef,
    RefObject,
} from "react";
import { Fragment } from "react";

import tw, { styled, css } from "twin.macro";

import { MotionCursor } from "components/motion-cursor";
import { TranslateText } from "utils/translate-text";

import { Translate } from "./translate";

const Title = styled.h1(() => [
    tw`relative z-50 inline-block max-w-full -mt-16 font-bold select-none lg:pr-16 prose-70 leading-20 lg:prose-140 lg:leading-38`,
    tw`subpixel-antialiased text-black bg-clip-text font-fbold lg:cursor-none lg:bg-intro-title-gradient`,
    tw`lg:[-webkit-text-fill-color:transparent]`,
    css`
        width: 634px;

        &:before {
            ${tw`absolute top-0 left-0 hidden text-white lg:block`}
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

function HomepageTitle() {
    const titleRef = useRef() as RefObject<HTMLHeadingElement>;
    const defaultState = useMemo(() => ({ x: 0, y: 0 }), []);
    const [position, setPosition] = useState(defaultState);

    const titleStyle = {
        "--x": `${position.x}px`,
        "--y": `${position.y}px`,
    } as CSSProperties;

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

    return (
        <Fragment>
            <Title
                data-text={TranslateText("home.title")}
                style={titleStyle}
                ref={titleRef}
            >
                <Translate id="home.title" />
            </Title>
            <MotionCursor onPositionUpdate={onPositionUpdate} />
        </Fragment>
    );
}

export default HomepageTitle;
