import {
    CSSProperties,
    FunctionComponent,
    memo,
    useCallback,
    useEffect,
    useState,
} from "react";

import tw, { css, styled } from "twin.macro";

import { Translate } from "@components/translate";
import { useNavigation } from "@hooks/use-navigation";
import { TrackMousePosition } from "@hooks/use-track-mouse-position";
import { State, useStore, useStoreProp } from "@store/index";

interface Props {
    onPositionUpdate?: (clientX: number, clientY: number) => void;
}

type CursorProps = {
    isMotionCursorVisible: State["isMotionCursorVisible"];
} & Partial<State["motionCursorData"]>;

const cursorSize = 80;

const Cursor = styled.div(
    ({ isMotionCursorVisible, color, size, overlap }: CursorProps) => [
        tw`fixed z-40 hidden lg:block text-white text-center uppercase rounded-full select-none cursor-pointer`,
        tw`border prose-12px`,
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
            width: ${size || cursorSize}px;
            height: ${size || cursorSize}px;
            transform: translate(-50%, -50%);
            transition: transform 300ms;
            will-change: left, top;

            a {
                cursor: pointer;
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

const CursorText = styled.div(() => [
    tw`m-auto`,
    css`
        width: 80%;
        line-height: 16px;
    `,
]);

const CursorLink: FunctionComponent<State["motionCursorData"]> = memo(
    ({ text, route, children }) => {
        const onNavigate = useNavigation({
            to: route,
        });

        if (!route) {
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

        return (
            <TextWrapper onClick={(e: any) => onNavigate(e, route)}>
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
    const [
        isMotionCursorVisibleCache,
        setIsMotionCursorVisibleCache,
    ] = useState(false);

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

export const MotionCursor: FunctionComponent<Props> = ({
    onPositionUpdate = null,
    children,
}) => {
    const [state] = useStore();
    const { clientX, clientY } = TrackMousePosition();
    const cursorStyle = {
        left: `${clientX || -state.motionCursorData.size || -cursorSize}px`,
        top: `${clientY || -state.motionCursorData.size || -cursorSize}px`,
    } as CSSProperties;

    useEffect(() => {
        if (onPositionUpdate) {
            onPositionUpdate(clientX, clientY);
        }
    }, [clientX, clientY, onPositionUpdate]);

    return (
        <Cursor
            isMotionCursorVisible={state.isMotionCursorVisible}
            {...state.motionCursorData}
            style={cursorStyle}
            className="cursor"
        >
            <CursorLink {...state.motionCursorData}>{children}</CursorLink>
        </Cursor>
    );
};
