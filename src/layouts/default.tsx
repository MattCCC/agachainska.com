import { FunctionComponent } from "react";
import tw, { styled, css } from "twin.macro";
import "@styles/layout.scss";
import { ReactComponent as WavePattern1 } from "@svg/Path 2@1x.svg";
import { ReactComponent as WavePattern2 } from "@svg/Path 2-1@1x.svg";
import { ReactComponent as WavePattern3 } from "@svg/Path 2-2@1x.svg";
import { ReactComponent as WavePattern4 } from "@svg/Path 2-3@1x.svg";

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

const Background = styled.div(() => [
    tw`overflow-hidden`,
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

const Wave1 = styled(WavePattern1)(() => [
    tw`absolute z-10`,
    css`
        width: 100vw;
        background-size: contain;
        height: 224.88px;
        top: 59.5px;
    `,
]);

const Wave2 = styled(WavePattern2)(() => [
    tw`absolute z-10`,
    css`
        width: 100vw;
        background-size: contain;
        height: 219.12px;
        top: 295.7px;
    `,
]);

const Wave3 = styled(WavePattern3)(() => [
    tw`absolute z-10`,
    css`
        width: 100vw;
        background-size: contain;
        height: 219.12px;
        top: 435.7px;
    `,
]);

const Wave4 = styled(WavePattern4)(() => [
    tw`absolute z-10`,
    css`
        width: 100vw;
        background-size: contain;
        height: 219.12px;
        top: 665.7px;
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
            <Background>
                <Wave1 viewBox="0 0 1440 224.88" preserveAspectRatio="none" />
                <Wave2 viewBox="0 0 1440 224.88" preserveAspectRatio="none" />
                <Wave3 viewBox="0 0 1440 224.88" preserveAspectRatio="none" />
                <Wave4 viewBox="0 0 1440 224.88" preserveAspectRatio="none" />
            </Background>
            {children}
        </Main>
    );
};
