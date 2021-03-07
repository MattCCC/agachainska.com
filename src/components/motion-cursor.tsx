import { CSSProperties, FunctionComponent, useEffect, useContext } from "react";
import tw, { css, styled } from "twin.macro";
import { TrackMousePosition } from "@hooks/track-mouse-position";
import { LinkStateContext } from "@store/link-context";

/**
 * Styles
 */
const Cursor = styled.div(({ isHovered }: { isHovered: boolean }) => [
    tw`fixed z-40 hidden lg:block text-white text-center uppercase rounded-full`,
    isHovered && tw`lg:hidden`,
    css`
        width: 80px;
        height: 80px;
        background-color: var(--black-color);
        border: 1px solid var(--black-color);
        transform: translate(-50%, -50%);
        font-size: 12px;
        padding: 24px 22px;
        cursor: none;
        user-select: none;

        a {
            cursor: none;
        }
    `,
]);

/**
 * Interfaces
 */
interface Props {
    onPositionUpdate: Function;
}

/**
 * Component
 * @param props
 */
export const MotionCursor: FunctionComponent<Props> = ({
    onPositionUpdate,
    children,
}) => {
    const linkContext = useContext(LinkStateContext);
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
            isHovered={linkContext.isHovered}
            style={cursorStyle}
            className="cursor"
        >
            {children}
        </Cursor>
    );
};
