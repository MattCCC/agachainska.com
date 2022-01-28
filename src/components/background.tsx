import { Fragment, FunctionComponent, useEffect } from "react";

import tw, { css, styled } from "twin.macro";

import { BackgroundNoise } from "@components/background-noise";
import { useStoreProp } from "@store/index";
import { ReactComponent as WavesPattern } from "@svg/bg-lines.svg";
import { ReactComponent as GreeceIllustration } from "@svg/Greece.svg";
import { ReactComponent as MaltaIllustration } from "@svg/Malta.svg";
import { ReactComponent as PixelLoveIllustration } from "@svg/Pixel love.svg";
import { ReactComponent as VectorsIllustration } from "@svg/Vectors.svg";
import { destroyMotionGrid, initMotionGrid } from "@utils/motion-grid";
import { excludeProps } from "@utils/styled";

interface Props {}

interface WavesProps {
    darkTheme: boolean;
}

const Waves = styled(
    WavesPattern,
    excludeProps(["darkTheme"])
)(({ darkTheme }: WavesProps) => [
    tw`absolute w-full`,
    darkTheme && tw`opacity-5`,
    css`
        height: 100vh;
        top: 59.5px;
    `,
]);

const Vectors = styled(VectorsIllustration)(() => [
    tw`absolute z-10`,
    css`
        @media screen and (max-width: 768px) {
            width: 42px;
            height: 42px;
            top: 30%;
            left: 53%;
        }

        width: 80px;
        height: 80px;
        left: 426px;
        top: 92px;
    `,
]);

const Greece = styled(GreeceIllustration)(() => [
    tw`absolute z-10`,
    css`
        @media screen and (max-width: 768px) {
            width: 58px;
            height: 58p;
            top: 68%;
            left: 10%;
        }

        width: 80px;
        height: 80px;
        left: 868px;
        top: 613px;
    `,
]);

const Malta = styled(MaltaIllustration)(() => [
    tw`absolute z-10`,
    css`
        width: 134px;
        height: 134px;
        left: 1045px;
        top: 195px;
    `,
]);

const PixelLove = styled(PixelLoveIllustration)(() => [
    tw`absolute z-10 hidden lg:block`,
    css`
        width: 134px;
        height: 134px;
        left: 174px;
        top: 634px;
    `,
]);

export const Background: FunctionComponent<Props> = () => {
    const [showMotionGrid] = useStoreProp("showMotionGrid");
    const [showWavePattern] = useStoreProp("showWavePattern");
    const [darkTheme] = useStoreProp("darkTheme");

    useEffect(() => {
        if (showMotionGrid) {
            initMotionGrid();
        }

        return destroyMotionGrid;
    }, [showMotionGrid]);

    return (
        <BackgroundNoise className="motion-grid">
            {showMotionGrid && (
                <Fragment>
                    <Vectors className="motion-grid__item" />
                    <Greece className="motion-grid__item" />
                    <Malta className="motion-grid__item" />
                    <PixelLove className="motion-grid__item" />
                </Fragment>
            )}
            {showWavePattern && <Waves darkTheme={darkTheme} />}
        </BackgroundNoise>
    );
};
