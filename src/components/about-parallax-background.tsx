import { FunctionComponent } from "react";

import {
    useViewportScroll,
    motion,
    useTransform,
  } from "framer-motion";
import tw, { css, styled } from "twin.macro";

import { ReactComponent as Basketball } from "@svg/Basketball.svg";
import { ReactComponent as Drink } from "@svg/Drink.svg";
import { ReactComponent as LondonEyeIllustration } from "@svg/London eye@1x.svg";
import { ReactComponent as Malta } from "@svg/Malta.svg";
import { ReactComponent as Maracas } from "@svg/Maracas.svg";
import { ReactComponent as PixelLove } from "@svg/Pixel love.svg";
import { ReactComponent as Torun } from "@svg/Torun.svg";
import { ReactComponent as Vectors } from "@svg/Vectors.svg";
import { ReactComponent as Vinyl } from "@svg/Vinyl.svg";


const IllustrationsContainer = styled.div(() => [
    tw`h-screen absolute w-full grid grid-cols-12`,
    css`
        max-width: 1260px;
        grid-gap: 30px;
        margin: 0 auto;
        left: 50%;
        transform: translateX(-50%);
    `
]);

const ParallaxCon = styled(motion.div)(() => [
    css`
        position: relative;
    `
]);

export const ParallaxBackground: FunctionComponent = () => {

    const { scrollY } = useViewportScroll();
    const y1 = useTransform(scrollY, [0, 1300], [0, 200]);
    const y2 = useTransform(scrollY, [0, 2000], [0, -150]);
    const y3 = useTransform(scrollY, [0, 3000], [0, 100]);
    const y4 = useTransform(scrollY, [0, 1800], [0, 500]);
    const y5 = useTransform(scrollY, [0, 2200], [0, -250]);
    const y6 = useTransform(scrollY, [0, 4000], [0, 500]);


    const Illustrations = [
        {
            illustration: <Torun />,
            top: "50%",
            colStart: "10",
            y: y1
        },
        {
            illustration: <LondonEyeIllustration />,
            top: "341%",
            colStart: "11",
            y: y2
        },
        {
            illustration: <Drink />,
            top: "266%",
            colStart: "5",
            y: y1
        },
        {
            illustration: <Vectors />,
            top: "425%",
            colStart: "8",
            y: y4
        },
        {
            illustration: <Vinyl />,
            top: "582%",
            colStart: "10",
            y: y2
        },
        {
            illustration: <Basketball />,
            top: "452%",
            colStart: "4",
            y: y3
        },
        {
            illustration: <Malta />,
            width: "107px",
            height: "107px",
            top: "602%",
            colStart: "8",
            y: y2
        },
        {
            illustration: <Maracas />,
            top: "738%",
            colStart: "11",
            y: y6
        },
        {
            illustration: <PixelLove />,
            top: "837%",
            colStart: "9",
            y: y5
        },
    ];


    return (
        <IllustrationsContainer>
                {Illustrations.map(({illustration, top, colStart, y, width = "80px", height = "80px"}, index) => (
                    <ParallaxCon style={{y , top, gridColumnStart: colStart, width, height}} key={index} >
                        {illustration}
                    </ParallaxCon>
                ))}
        </IllustrationsContainer>
);
};
