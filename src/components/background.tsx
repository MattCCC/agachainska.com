import { Fragment, useEffect } from "react";

import tw, { css, styled } from "twin.macro";

import { BackgroundNoise } from "components/background-noise";
import { useStoreProp } from "store/index";
import WavesPattern from "svg/bg-lines.svg";
import GreeceIllustration from "svg/Greece.svg?url";
import MaltaIllustration from "svg/Malta.svg?url";
import PixelLoveIllustration from "svg/Pixel love.svg?url";
import VectorsIllustration from "svg/Vectors.svg?url";
import { destroyMotionGrid, initMotionGrid } from "utils/motion-grid";
import { excludeProps } from "utils/styled";

import Image from "next/image";

const loadIllustration = (illustration: string) => {
    switch (illustration) {
        case GreeceIllustration:
            return <Image src={GreeceIllustration} alt={""} />;
        case MaltaIllustration:
            return <Image src={MaltaIllustration} alt={""} />;
        case PixelLoveIllustration:
            return <Image src={PixelLoveIllustration} alt={""} />;
        case VectorsIllustration:
            return <Image src={VectorsIllustration} alt={""} />;
        case WavesPattern:
        default:
            return <Image src={WavesPattern} alt={""} />;
    }
};

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

const Vectors = styled.div(() => [
    tw`absolute z-10`,
    tw`w-[42px] h-[42px] top-[30%] left-[53%]`,
    tw`lg:w-[80px] lg:h-[80px] lg:left-[426px] lg:top-[92px]`,
]);

const Greece = styled.div(() => [
    tw`absolute z-10`,
    tw`w-[58px] h-[58px] top-[68%] left-[10%]`,
    tw`lg:w-[80px] lg:h-[80px] lg:top-[868px] lg:left-[613px]`,
]);

const Malta = styled.div(() => [
    tw`absolute z-10`,
    css`
        width: 134px;
        height: 134px;
        left: 1045px;
        top: 195px;

        img {
            ${tw`w-full h-full`}
        }
    `,
]);

const PixelLove = styled.div(() => [
    tw`absolute z-10 hidden lg:block`,
    css`
        width: 134px;
        height: 134px;
        left: 174px;
        top: 634px;

        img {
            ${tw`w-full h-full`}
        }
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
                        <Vectors className="motion-grid__item">
                            {loadIllustration(VectorsIllustration)}
                        </Vectors>
                        <Greece className="motion-grid__item">
                            {loadIllustration(GreeceIllustration)}
                        </Greece>
                        <Malta className="motion-grid__item">
                            {loadIllustration(MaltaIllustration)}
                        </Malta>
                        <PixelLove className="motion-grid__item">
                            {loadIllustration(PixelLoveIllustration)}
                        </PixelLove>
                    </Fragment>
                )}
                {showWavePattern && <Waves darkTheme={darkTheme} />}
            </MotionGridWrapper>
        </Fragment>
    );
};
