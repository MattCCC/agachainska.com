import {
    CSSProperties,
    Fragment,
    memo,
    PropsWithChildren,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import tw, { css, styled } from "twin.macro";

import { Translate } from "components/translate";
import { useNavigation } from "hooks/use-navigation";
import { useTrackMousePosition } from "hooks/use-track-mouse-position";
import { State, useStoreProp } from "store/index";

interface Props {
    onPositionUpdate?: ((clientX: number, clientY: number) => void) | null;
}

type CursorProps = {
    isMotionCursorVisible: State["isMotionCursorVisible"];
    projectCoverLink?: string;
} & Partial<State["motionCursorData"]>;

const cursorSize = 80;

const Cursor = styled.div(
    ({ isMotionCursorVisible, color, size, overlap }: CursorProps) => [
        tw`fixed z-40 hidden text-center text-white uppercase rounded-full select-none lg:block`,
        tw`leading-3 border prose-12`,
        color === "black" && tw`bg-black border-black`,
        color === "melrose" && tw`bg-melrose border-melrose`,
        overlap &&
            css`
                margin-left: -${(size || cursorSize) / 2 - 10}px;
            `,
        !overlap &&
            css`
                margin-left: -${size || cursorSize}px;
            `,
        css`
            top: var(--top);
            left: var(--left);
            width: ${size || cursorSize}px;
            height: ${size || cursorSize}px;
            transform: translate(-50%, -50%);
            transition: transform 300ms;
            will-change: left, top;

            a {
                cursor: none;
            }
        `,
        !isMotionCursorVisible &&
            css`
                transform: scale(0.08);
                font-size: 0;
            `,
    ]
);

const TextWrapper = styled.div(() => [tw`flex w-full h-full`]);

const LinkWrapper = styled.a(() => [tw`flex w-full h-full`]);

const CursorText = styled.div(() => [
    tw`m-auto cursor-none w-[80%] leading-[16px]`,
]);

const ProjectCover = styled.div(
    ({ isMotionCursorVisible, projectCoverLink }: CursorProps) => [
        tw`absolute z-30 hidden opacity-0 lg:block cursor-none`,
        tw`top-[35px] left-[120px]`,
        css`
            background: url(${projectCoverLink}) center;
            background-size: cover;
            width: 400px;
            height: 215px;
            margin: 14px 0 0 -30px;
            transform: rotate(-10deg) scale(0.5);

            @keyframes showImg {
                from {
                    opacity: 0;
                    transform: rotate(-10deg) scale(0);
                }

                to {
                    opacity: 1;
                    transform: rotate(0deg) scale(1);
                }
            }

            @keyframes hideImg {
                from {
                    opacity: 1;
                    transform: scale(1);
                }

                to {
                    opacity: 0;
                    transform: scale(1.1);
                }
            }
        `,
        isMotionCursorVisible &&
            css`
                animation: 0.4s showImg forwards;
                animation-delay: 0.1s;
            `,
        !isMotionCursorVisible &&
            css`
                animation: 0.3s hideImg forwards;
            `,
    ]
);

const CursorLink = memo(
    ({
        text,
        target,
        to,
        children,
    }: PropsWithChildren<State["motionCursorData"]>) => {
        const onNavigate = useNavigation({
            to,
        });

        if (!to) {
            if (text) {
                return (
                    <TextWrapper>
                        <CursorText>
                            <Translate id={text} />
                        </CursorText>
                    </TextWrapper>
                );
            }

            return <CursorText>{children}</CursorText>;
        }

        if (target === "_blank") {
            return (
                <LinkWrapper
                    target={target}
                    href={to}
                    rel="nofollow noreferrer"
                >
                    <CursorText>
                        <Translate id={text} />
                    </CursorText>
                </LinkWrapper>
            );
        }

        return (
            <TextWrapper as="a" href={to} onClick={onNavigate}>
                <CursorText>
                    <Translate id={text} />
                </CursorText>
            </TextWrapper>
        );
    }
);

export const useHideCursorPreserveVisibility = () => {
    const [isMotionCursorVisible, dispatch] = useStoreProp(
        "isMotionCursorVisible"
    );
    const [isMotionCursorVisibleCache, setIsMotionCursorVisibleCache] =
        useState(false);

    const onMouseEnter = useCallback((): void => {
        const isVisible = isMotionCursorVisible;

        if (isVisible) {
            setIsMotionCursorVisibleCache(isVisible);
            dispatch.showMotionCursor(false);
        }
    }, [dispatch, isMotionCursorVisible]);

    const onMouseLeave = useCallback((): void => {
        if (isMotionCursorVisibleCache) {
            setIsMotionCursorVisibleCache(false);
            dispatch.showMotionCursor(true);
        }
    }, [dispatch, isMotionCursorVisibleCache]);

    return [onMouseEnter, onMouseLeave];
};

export const MotionCursor = ({
    onPositionUpdate = null,
    children,
}: PropsWithChildren<Props>) => {
    const cursorRef = useRef<HTMLDivElement>(null);

    const [motionCursorData] = useStoreProp("motionCursorData");
    const [isMotionCursorVisible] = useStoreProp("isMotionCursorVisible");
    const { clientX, clientY } = useTrackMousePosition();
    const projectCover = motionCursorData.projectCover;

    useEffect(() => {
        if (onPositionUpdate) {
            onPositionUpdate(clientX, clientY);
        }
    }, [clientX, clientY, onPositionUpdate]);

    useEffect(() => {
        if (cursorRef.current) {
            cursorRef.current.style.setProperty(
                "--top",
                `${clientY || -motionCursorData.size || -cursorSize}px`
            );

            cursorRef.current.style.setProperty(
                "--left",
                `${clientX || -motionCursorData.size || -cursorSize}px`
            );
        }
    }, [clientX, clientY, cursorRef, motionCursorData.size]);

    return (
        <Fragment>
            <Cursor
                ref={cursorRef}
                isMotionCursorVisible={isMotionCursorVisible}
                {...motionCursorData}
                className="cursor"
            >
                <CursorLink {...motionCursorData}>{children}</CursorLink>

                {projectCover && (
                    <ProjectCover
                        className="project-cover"
                        isMotionCursorVisible={isMotionCursorVisible}
                        projectCoverLink={projectCover}
                    />
                )}
            </Cursor>
        </Fragment>
    );
};
