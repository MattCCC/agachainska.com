import { FunctionComponent, Fragment } from "react";

import tw, { css, styled } from "twin.macro";

import { ReactComponent as GreekEyeIllustration } from "@svg/Greek eye@1x.svg";
import { ReactComponent as LondonEyeIllustration } from "@svg/London eye@1x.svg";
import { ReactComponent as CaipirinhaIllustration } from "@svg/London eye@1x.svg";
import { ReactComponent as PricklyPearIllustration } from "@svg/Prickly pear@1x.svg";


const IllustrationsContainer = styled.div(() => [
    tw`h-screen absolute w-full grid grid-cols-12`,
    css`
        margin: 0 auto;
        left: 50%;
        transform: translateX(-50%);
    `
]);

const GreekEye = styled(GreekEyeIllustration)(() => [
    tw`absolute z-10`,
    css`
        width: 80px;
        height: 80px;
        left: 1167px;
        top: 102px;
    `,
]);

const LondonEye = styled(LondonEyeIllustration)(() => [
    tw`absolute z-10`,
    css`
        width: 80px;
        height: 80px;
        left: 1268px;
        top: 613px;
    `,
]);

const PricklyPear = styled(PricklyPearIllustration)(() => [
    tw`absolute z-10`,
    css`
        width: 80px;
        height: 80px;
        left: 652px;
        top: 692px;
    `,
]);

const GreekEyeTwo = styled(GreekEyeIllustration)(() => [
    tw`absolute z-10`,
    css`
        width: 80px;
        height: 80px;
        left: 970px;
        top: 975px;
    `,
]);


const LondonEyeTwo = styled(LondonEyeIllustration)(() => [
    tw`absolute z-10`,
    css`
        width: 80px;
        height: 80px;
        left: 1158px;
        top: 1262px;
    `,
]);

const Caipirinha = styled(CaipirinhaIllustration)(() => [
    tw`absolute z-10`,
    css`
        width: 80px;
        height: 80px;
        left: 512px;
        top: 1392px;
    `,
]);

const PricklyPearTwo = styled(PricklyPearIllustration)(() => [
    tw`absolute z-10`,
    css`
        width: 107px;
        height: 107px;
        left: 985px;
        top: 1852px;
    `,
]);

const GreekEyeThree = styled(GreekEyeIllustration)(() => [
    tw`absolute z-10`,
    css`
        width: 80px;
        height: 80px;
        left: 1116px;
        top: 2303px;
    `,
]);


const LondonEyeThree = styled(LondonEyeIllustration)(() => [
    tw`absolute z-10`,
    css`
        width: 80px;
        height: 80px;
        left: 1206px;
        top: 2073px;
    `,
]);

export const ParallaxBackground: FunctionComponent = () => (
    <IllustrationsContainer>
        <Fragment>
            <GreekEye />
            <LondonEye />
            <PricklyPear />
            <GreekEyeTwo />
            <LondonEyeTwo />
            <Caipirinha />
            <PricklyPearTwo />
            <GreekEyeThree />
            <LondonEyeThree />
        </Fragment>
    </IllustrationsContainer>
);
