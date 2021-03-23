import { CSSProperties, FunctionComponent, useEffect } from "react";

import tw, { css, styled } from "twin.macro";

import { TrackMousePosition } from "@hooks/track-mouse-position";
import { useStore } from "@store/index";

/**
 * Styles
 */
const Cursor = styled.div(
    ({ isMotionCursorVisible }: { isMotionCursorVisible: boolean }) => [
        tw`fixed z-40 hidden lg:block text-white text-center uppercase rounded-full select-none`,
        css`
            width: 80px;
            height: 80px;
            background-color: var(--black-color);
            border: 1px solid var(--black-color);
            transform: translate(-50%, -50%);
            margin-left: -30px;
            font-size: 12px;
            padding: 24px 22px;
            cursor: pointer;
            transition: transform 300ms;

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

/**
 * Interfaces
 */
interface Props {
    onPositionUpdate: (clientX: number, clientY: number) => void;
}

/**
 * Component
 * @param props
 */
export const MotionCursor: FunctionComponent<Props> = ({
    onPositionUpdate,
    children,
}) => {
    const [state] = useStore();
    const cursorWidth = 80;
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
            {children}
        </Cursor>
    );
};
