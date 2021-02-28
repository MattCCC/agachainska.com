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
                #bfffa0 0%,
                rgba(136, 238, 251, 1) 30.9%,
                #b9a6fe 61.63%,
                #ffabfc 100%
            );
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
    return <Main hasGradient>{children}</Main>;
};
