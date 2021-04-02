import { CSSProperties, FunctionComponent, memo, useEffect } from "react";

import tw, { css, styled } from "twin.macro";

import { Translate } from "@components/translate";
import { useNavigation } from "@hooks/use-navigation";
import { TrackMousePosition } from "@hooks/use-track-mouse-position";
import { useStore } from "@store/index";

interface Props {
    onPositionUpdate?: (clientX: number, clientY: number) => void;
}

const Cursor = styled.div(
    ({ isMotionCursorVisible }: { isMotionCursorVisible: boolean }) => [
        tw`fixed z-40 hidden lg:block text-white text-center uppercase rounded-full select-none bg-black cursor-pointer`,
        tw`border border-black prose-12px`,
        css`
            width: 80px;
            height: 80px;
            transform: translate(-50%, -50%);
            margin-left: -30px;
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

const CursorLink: FunctionComponent<{ text: string; route: string }> = memo(
    ({ text, route, children }) => {
        const onNavigate = useNavigation({
            to: route,
        });

        if (!text || !route) {
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

const cursorWidth = 80;

export const MotionCursor: FunctionComponent<Props> = ({
    onPositionUpdate = null,
    children,
}) => {
    const [state] = useStore();
    const { clientX, clientY } = TrackMousePosition();
    const cursorStyle = {
        left: `${clientX || -cursorWidth}px`,
        top: `${clientY || -cursorWidth}px`,
    } as CSSProperties;

    useEffect(() => {
        if (onPositionUpdate) {
            onPositionUpdate(clientX, clientY);
        }
    }, [clientX, clientY, onPositionUpdate]);

    return (
        <Cursor
            isMotionCursorVisible={state.isMotionCursorVisible}
            style={cursorStyle}
            className="cursor"
        >
            <CursorLink
                text={state.motionCursorData.text}
                route={state.motionCursorData.route}
            >
                {children}
            </CursorLink>
        </Cursor>
    );
};
