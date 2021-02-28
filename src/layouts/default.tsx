import { FunctionComponent } from "react";
import { styled, css } from "twin.macro";
import "@styles/layout.scss";

/**
 * Styles
 */
const Main = styled.main(({ hasGradient }: { hasGradient: boolean }) => [
    css`
        height: 100%;
        min-height: 100vh;
        width: 100%;
    `,
    hasGradient &&
        css`
            background: linear-gradient(
                314.58deg,
                rgba(191, 255, 160, 0.1) 0%,
                rgba(136, 238, 251, 0.1) 30.9%,
                rgba(185, 166, 254, 0.1) 61.63%,
                rgba(255, 171, 252, 0.1) 100%
            );
        `,
]);

const Bg = styled.div(() => [
    css`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 0;
        background: url("./svg/bg-pattern.svg") repeat;
        height: 100%;
        min-height: 100vh;
        width: 100%;
    `,
]);

/**
 * Interfaces
 */
interface Props {}

/**
 * Component
 * @param props
 */
export const Layout: FunctionComponent<Props> = ({ children }) => {
    return (
        <Main hasGradient>
            <Bg />
            {children}
        </Main>
    );
};
