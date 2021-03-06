import { CSSProperties, FunctionComponent } from "react";
import tw, { css, styled } from "twin.macro";

/**
 * Styles
 */
const Cursor = styled.div(() => [
    tw`fixed text-white text-center uppercase z-40 rounded-full`,
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
    clientX: number;
    clientY: number;
}

/**
 * Component
 * @param props
 */
export const MotionCursor: FunctionComponent<Props> = ({
    clientX = 0,
    clientY = 0,
    children,
}) => {
    const cursorWidth = 80;
    const cursorStyle = {
        left: `${clientX || -cursorWidth}px`,
        top: `${clientY || -cursorWidth}px`,
    } as CSSProperties;

    return (
        <Cursor style={cursorStyle} className="cursor">
            {children}
        </Cursor>
    );
};
