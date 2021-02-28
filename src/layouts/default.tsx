import { FunctionComponent } from "react";
import tw, { styled, css } from "twin.macro";
import "@styles/layout.scss";
import { ReactComponent as WavePattern1 } from "@svg/Path 2@1x.svg";
import { ReactComponent as WavePattern2 } from "@svg/Path 2-1@1x.svg";
import { ReactComponent as WavePattern3 } from "@svg/Path 2-2@1x.svg";
import { ReactComponent as WavePattern4 } from "@svg/Path 2-3@1x.svg";
import { ReactComponent as GreekEyeIllustration } from "@svg/Greek eye@1x.svg";
import { ReactComponent as LondonEyeIllustration } from "@svg/London eye@1x.svg";
import { ReactComponent as PricklyPearIllustration } from "@svg/Prickly pear@1x.svg";
import { ReactComponent as CaipirinhaIllustration } from "@svg/London eye@1x.svg";

/**
 * Styles
 */
const Main = styled.main(({ hasGradient }: { hasGradient: boolean }) => [
    tw`h-full w-full min-h-screen text-primary-color`,
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
    tw`absolute overflow-hidden z-0 top-0 left-0 right-0 h-full	w-full min-h-screen`,
    css`
        background: url("./svg/bg-pattern.svg") repeat;
    `,
]);

const Wave1 = styled(WavePattern1)(() => [
    tw`absolute w-full`,
    css`
        height: 224.88px;
        top: 59.5px;
    `,
]);

const Wave2 = styled(WavePattern2)(() => [
    tw`absolute w-full`,
    css`
        height: 219.12px;
        top: 295.7px;
    `,
]);

const Wave3 = styled(WavePattern3)(() => [
    tw`absolute w-full`,
    css`
        height: 219.12px;
        top: 435.7px;
    `,
]);

const Wave4 = styled(WavePattern4)(() => [
    tw`absolute w-full`,
    css`
        height: 219.12px;
        top: 665.7px;
    `,
]);

const GreekEye = styled(GreekEyeIllustration)(() => [
    tw`absolute z-10`,
    css`
        width: 80px;
        height: 80px;
        left: 426px;
        top: 92px;
    `,
]);

const LondonEye = styled(LondonEyeIllustration)(() => [
    tw`absolute z-10`,
    css`
        width: 80px;
        height: 80px;
        left: 868px;
        top: 613px;
    `,
]);

const PricklyPear = styled(PricklyPearIllustration)(() => [
    tw`absolute z-10`,
    css`
        width: 134px;
        height: 134px;
        left: 1045px;
        top: 195px;
    `,
]);

const Caipirinha = styled(CaipirinhaIllustration)(() => [
    tw`absolute z-10`,
    css`
        width: 80px;
        height: 80px;
        left: 174px;
        top: 634px;
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
                <GreekEye />
                <LondonEye />
                <PricklyPear />
                <Caipirinha />

                <Wave1 />
                <Wave2 />
                <Wave3 />
                <Wave4 />
            </Background>
            {children}
        </Main>
    );
};
