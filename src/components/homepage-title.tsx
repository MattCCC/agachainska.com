import { useCallback, Fragment, RefObject, useRef } from "react";

import tw, { styled, css } from "twin.macro";

import { MotionCursor } from "components/motion-cursor";

import { Translate } from "./translate";
import { useTranslation } from "hooks/use-translation";

const Title = styled.h1(() => [
    tw`relative z-50 inline-block max-w-full -mt-16 font-bold select-none lg:pr-16 text-[70px] leading-20 lg:text-[140px] lg:leading-38`,
    tw`subpixel-antialiased text-black bg-clip-text font-fbold lg:cursor-none lg:bg-intro-title-gradient`,
    tw`lg:[-webkit-text-fill-color:transparent]`,
    css`
        width: 634px;
        --y: 0;
        --x: 0;

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

const cursorMarginLeft = 31;

function HomepageTitle() {
    const titleRef = useRef() as RefObject<HTMLHeadingElement>;
    const el = titleRef.current;
    const { t } = useTranslation();

    const onPositionUpdate = useCallback(
        (clientX: number, clientY: number) => {
            if (!el) {
                return;
            }

            const clientRect = el.getBoundingClientRect();

            if (!clientRect) {
                return;
            }

            el.setAttribute(
                "style",
                "--y: " +
                    (clientY - clientRect.top) +
                    "px; " +
                    "--x: " +
                    (clientX - clientRect.left - cursorMarginLeft) +
                    "px"
            );
        },
        [el]
    );

    return (
        <Fragment>
            <Title data-text={t("home.title")} ref={titleRef}>
                <Translate id="home.title" />
            </Title>
            <MotionCursor onPositionUpdate={onPositionUpdate} />
        </Fragment>
    );
}

export default HomepageTitle;
