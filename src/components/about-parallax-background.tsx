import { FunctionComponent, Fragment } from "react";

import {
    useViewportScroll,
    motion,
    useTransform,
  } from "framer-motion";
import tw, { css, styled } from "twin.macro";

import { ReactComponent as GreekEyeIllustration } from "@svg/Greek eye@1x.svg";
import { ReactComponent as LondonEyeIllustration } from "@svg/London eye@1x.svg";
import { ReactComponent as PricklyPearIllustration } from "@svg/Prickly pear@1x.svg";


const IllustrationsContainer = styled.div(() => [
    tw`h-screen absolute w-full`,
    css`
        margin: 0 auto;
        left: 50%;
        transform: translateX(-50%);
    `
]);

const ParallaxCon = styled(motion.div)(() => [
    css`
        position: absolute;
    `
]);

export const ParallaxBackground: FunctionComponent = () => {

    const { scrollY } = useViewportScroll();
    const y1 = useTransform(scrollY, [0, 1100], [0, 200]);
    const y2 = useTransform(scrollY, [0, 2000], [0, -350]);
    const y3 = useTransform(scrollY, [0, 3000], [0, 100]);
    const y4 = useTransform(scrollY, [0, 1800], [0, 500]);
    const y5 = useTransform(scrollY, [0, 2200], [0, -250]);
    const y6 = useTransform(scrollY, [0, 4500], [0, 200]);


    const Illustrations = [
        {
            illustration: <GreekEyeIllustration />,
            top: "102px",
            left: "1167px",
            y: y1
        },
        {
            illustration: <LondonEyeIllustration />,
            top: "613px",
            left: "1268px",
            y: y2
        },
        {
            illustration: <PricklyPearIllustration />,
            top: "692px",
            left: "652px",
            y: y1
        },
        {
            illustration: <GreekEyeIllustration />,
            top: "975px",
            left: "970px",
            y: y4
        },
        {
            illustration: <LondonEyeIllustration />,
            top: "1262px",
            left: "1158px",
            y: y2
        },
        {
            illustration: <LondonEyeIllustration />,
            top: "1392px",
            left: "512px",
            y: y3
        },
        {
            illustration: <PricklyPearIllustration />,
            width: "107px",
            height: "107px",
            top: "1852px",
            left: "985px",
            y: y2
        },
        {
            illustration: <GreekEyeIllustration />,
            top: "2303px",
            left: "1116px",
            y: y6
        },
        {
            illustration: <LondonEyeIllustration />,
            top: "2073px",
            left: "1206px",
            y: y5
        },
    ];


    return (
        <IllustrationsContainer>
            <Fragment>
                {Illustrations.map(({illustration, top, left, y, width = "80px", height = "80px"}, index) => (
                    <ParallaxCon style={{y, top, left, width, height}} key={index} >
                        {illustration}
                    </ParallaxCon>
                ))}
            </Fragment>
        </IllustrationsContainer>
);
};
