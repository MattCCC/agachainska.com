import {
    CSSProperties,
    Fragment,
    FunctionComponent,
    useEffect,
    useState,
} from "react";
import tw, { styled, css } from "twin.macro";
import "@styles/layout.scss";
import { ReactComponent as WavePattern1 } from "@svg/bg-lines.svg";
import { ReactComponent as GreekEyeIllustration } from "@svg/Greek eye@1x.svg";
import { ReactComponent as LondonEyeIllustration } from "@svg/London eye@1x.svg";
import { ReactComponent as PricklyPearIllustration } from "@svg/Prickly pear@1x.svg";
import { ReactComponent as CaipirinhaIllustration } from "@svg/London eye@1x.svg";
import { destroyMotionGrid, initMotionGrid } from "@utils/motion-grid";
import {
    requestInterval,
    clearRequestInterval,
} from "@essentials/request-interval";
import { getRandomNumber } from "@utils/random-number";
import { Overlays } from "@components/overlays";
import { FullPageOverlay } from "@components/full-page-overlay";
import { useStore } from "@store/index";

/**
 * Styles
 */
const Main = styled.main(({ hasGradient }: { hasGradient: boolean }) => [
    tw`h-full w-full min-h-screen text-primary-color`,
    css`
        -webkit-backface-visibility: hidden;
        -webkit-transform: scale(1);
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
    tw`absolute overflow-hidden z-0 top-0 left-0 right-0 h-full	w-full min-h-screen`,
    css`
        -webkit-backface-visibility: hidden;
        -webkit-transform: scale(1);
        background: url("./svg/bg-pattern.svg") repeat;
        background-position: var(--x) var(--y);
    `,
]);

const Waves = styled(WavePattern1)(() => [
    tw`absolute w-full`,
    css`
        height: 100vh;
        top: 59.5px;
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
    const defaultState = { x: 0, y: 0 };
    const [position, setPosition] = useState(defaultState);
    const [state] = useStore();
    const backgroundStyle = {
        "--x": `${position.x}px`,
        "--y": `${position.y}px`,
    } as CSSProperties;

    useEffect(() => {
        if (state.showMotionGrid) {
            initMotionGrid();
        }

        const intervalId = requestInterval(() => {
            setPosition({
                x: getRandomNumber(0, 100),
                y: 0,
            });
        }, 150);

        return (): void => {
            if (intervalId) {
                clearRequestInterval(intervalId);
            }

            destroyMotionGrid();
        };
    }, [state.showMotionGrid]);

    return (
        <Fragment>
            <Overlays />
            <FullPageOverlay />
            <Main hasGradient>
                <Background className="motion-grid" style={backgroundStyle}>
                    {state.showMotionGrid && (
                        <Fragment>
                            <GreekEye className="motion-grid__item" />
                            <LondonEye className="motion-grid__item" />
                            <PricklyPear className="motion-grid__item" />
                            <Caipirinha className="motion-grid__item" />
                        </Fragment>
                    )}
                    <Waves />
                </Background>
                {children}
            </Main>
        </Fragment>
    );
};
