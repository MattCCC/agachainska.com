import {
    CSSProperties,
    Fragment,
    memo,
    PropsWithChildren,
    useCallback,
    useEffect,
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
    tw`m-auto cursor-none`,
    css`
        width: 80%;
        line-height: 16px;
    `,
]);

const ProjectHover = styled.div(() => []);

const ProjectCover = styled.div(
    ({ isMotionCursorVisible, projectCoverLink }: CursorProps) => [
        tw`fixed z-30 hidden lg:block cursor-none`,
        css`
            top: var(--top);
            left: var(--left);
            opacity: 0;
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
    const [motionCursorData] = useStoreProp("motionCursorData");
    const [isMotionCursorVisible] = useStoreProp("isMotionCursorVisible");
    const { clientX, clientY } = useTrackMousePosition();
    const projectCover = motionCursorData.projectCover;

    const cursorStyle = {
        "--left": `${clientX || -motionCursorData.size || -cursorSize}px`,
        "--top": `${clientY || -motionCursorData.size || -cursorSize}px`,
    } as CSSProperties;

    useEffect(() => {
        if (onPositionUpdate) {
            onPositionUpdate(clientX, clientY);
        }
    }, [clientX, clientY, onPositionUpdate]);

    return (
        <Fragment>
            <Cursor
                isMotionCursorVisible={isMotionCursorVisible}
                {...motionCursorData}
                style={cursorStyle}
                className="cursor"
            >
                <CursorLink {...motionCursorData}>{children}</CursorLink>
            </Cursor>

            {projectCover && (
                <ProjectHover>
                    <ProjectCover
                        style={cursorStyle}
                        isMotionCursorVisible={isMotionCursorVisible}
                        projectCoverLink={projectCover}
                    />
                </ProjectHover>
            )}
        </Fragment>
    );
};
