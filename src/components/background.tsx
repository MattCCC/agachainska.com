import { Fragment, useEffect } from "react";

import tw, { css, styled } from "twin.macro";

import { BackgroundNoise } from "components/background-noise";
import { useStoreProp } from "store/index";
import WavesPattern from "svg/bg-lines.svg";
import GreeceIllustration from "svg/Greece.svg";
import MaltaIllustration from "svg/Malta.svg";
import PixelLoveIllustration from "svg/Pixel love.svg";
import VectorsIllustration from "svg/Vectors.svg";
import { destroyMotionGrid, initMotionGrid } from "utils/motion-grid";
import { excludeProps } from "utils/styled";

interface WavesProps {
    darkTheme: boolean;
}

const Waves = styled(WavesPattern).withConfig(excludeProps(["darkTheme"]))(
    ({ darkTheme }: WavesProps) => [
        tw`absolute w-full`,
        darkTheme && tw`opacity-5`,
        css`
            height: 200vh;
            top: 59.5px;
        `,
    ]
);

const Vectors = styled(VectorsIllustration)(() => [
    tw`absolute z-10`,
    tw`w-[42px] h-[42px] top-[30%] left-[53%]`,
    tw`lg:w-[80px] lg:h-[80px] lg:left-[426px] lg:top-[92px]`,
]);

const Greece = styled(GreeceIllustration)(() => [
    tw`absolute z-10`,
    tw`w-[58px] h-[58px] top-[68%] left-[10%]`,
    tw`lg:w-[80px] lg:h-[80px] lg:top-[868px] lg:left-[613px]`,
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

const MotionGridWrapper = styled.div(() => [
    tw`absolute top-0 left-0 right-0 z-0 w-full h-full min-h-screen overflow-hidden`,
    css`
        backface-visibility: hidden;
        transform: scale(1);
    `,
]);

export const Background = () => {
    const [showMotionGrid] = useStoreProp("showMotionGrid");
    const [showWavePattern] = useStoreProp("showWavePattern");
    const [darkTheme] = useStoreProp("darkTheme");
    const [isSingleProject] = useStoreProp("isSingleProject");

    useEffect(() => {
        if (showMotionGrid) {
            initMotionGrid();
        }

        return destroyMotionGrid;
    }, [showMotionGrid]);

    return (
        <Fragment>
            {!isSingleProject && <BackgroundNoise />}

            <MotionGridWrapper className="motion-grid">
                {showMotionGrid && (
                    <Fragment>
                        <Vectors className="motion-grid__item" />
                        <Greece className="motion-grid__item" />
                        <Malta className="motion-grid__item" />
                        <PixelLove className="motion-grid__item" />
                    </Fragment>
                )}
                {showWavePattern && <Waves darkTheme={darkTheme} />}
            </MotionGridWrapper>
        </Fragment>
    );
};
