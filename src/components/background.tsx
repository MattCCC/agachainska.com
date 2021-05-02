import { Fragment, FunctionComponent, useEffect } from "react";

import tw, { css, styled } from "twin.macro";

import { BackgroundNoise } from "@components/background-noise";
import { useStore } from "@store/index";
import { ReactComponent as WavesPattern } from "@svg/bg-lines.svg";
import { ReactComponent as GreekEyeIllustration } from "@svg/Greek eye@1x.svg";
import { ReactComponent as LondonEyeIllustration } from "@svg/London eye@1x.svg";
import { ReactComponent as CaipirinhaIllustration } from "@svg/London eye@1x.svg";
import { ReactComponent as PricklyPearIllustration } from "@svg/Prickly pear@1x.svg";
import { destroyMotionGrid, initMotionGrid } from "@utils/motion-grid";

interface Props {}

const Waves = styled(WavesPattern)(() => [
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

export const Background: FunctionComponent<Props> = () => {
    const [state] = useStore();

    useEffect(() => {
        if (state.showMotionGrid) {
            initMotionGrid();
        }

        return destroyMotionGrid;
    }, [state.showMotionGrid]);

    return (
        <BackgroundNoise className="motion-grid">
            {state.showMotionGrid && (
                <Fragment>
                    <GreekEye className="motion-grid__item" />
                    <LondonEye className="motion-grid__item" />
                    <PricklyPear className="motion-grid__item" />
                    <Caipirinha className="motion-grid__item" />
                </Fragment>
            )}
            {state.showWavePattern && <Waves />}
        </BackgroundNoise>
    );
};
