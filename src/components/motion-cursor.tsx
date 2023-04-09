import {
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
        tw`hidden opacity-0 lg:block cursor-none`,
        tw`-mt-[20px] ml-[90px]`,
        css`
            background: url(${projectCoverLink}) center;
            background-size: cover;
            width: 400px;
            height: 215px;
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
    }: PropsWithChildren<{ text: string; to: string; target: string }>) => {
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
    const projectCover = motionCursorData.projectCover;

    useEffect(() => {
        if (!cursorRef.current) {
            return;
        }

        const refStyle = cursorRef.current.style;

        const setMousePosition = ({ clientX = 0, clientY = 0 }) => {
            if (onPositionUpdate) {
                onPositionUpdate(clientX, clientY);
            }

            refStyle.setProperty("--top", clientY + "px");
            refStyle.setProperty("--left", clientX + "px");
        };

        window.addEventListener("mousemove", setMousePosition);

        return (): void => {
            window.removeEventListener("mousemove", setMousePosition);
        };
    }, [cursorRef, onPositionUpdate]);

    return (
        <Cursor
            ref={cursorRef}
            isMotionCursorVisible={isMotionCursorVisible}
            color={motionCursorData.color}
            size={motionCursorData.size}
            overlap={motionCursorData.overlap}
            className="cursor"
        >
            <CursorLink
                text={motionCursorData.text}
                target={motionCursorData.target}
                to={motionCursorData.to}
            >
                {children}
            </CursorLink>

            {projectCover && (
                <ProjectCover
                    className="project-cover"
                    isMotionCursorVisible={isMotionCursorVisible}
                    projectCoverLink={projectCover}
                />
            )}
        </Cursor>
    );
};
