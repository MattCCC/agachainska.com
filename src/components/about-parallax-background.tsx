import { useScroll, motion, useTransform } from "framer-motion";
import tw, { css, styled } from "twin.macro";

import { ReactComponent as Basketball } from "svg/Basketball.svg";
import { ReactComponent as Drink } from "svg/Drink.svg";
import { ReactComponent as LondonEyeIllustration } from "svg/London eye@1x.svg";
import { ReactComponent as Malta } from "svg/Malta.svg";
import { ReactComponent as Peach } from "svg/Peach.svg";
import { ReactComponent as PixelLove } from "svg/Pixel love.svg";
import { ReactComponent as Torun } from "svg/Torun.svg";
import { ReactComponent as Vectors } from "svg/Vectors.svg";
import { ReactComponent as Vinyl } from "svg/Vinyl.svg";

const IllustrationsContainer = styled.div(() => [
    tw`absolute grid w-full h-screen grid-cols-12`,
    css`
        max-width: 1260px;
        grid-gap: 30px;
        margin: 0 auto;
        left: 50%;
        transform: translateX(-50%);
    `,
]);

const ParallaxCon = styled(motion.div)(() => [
    css`
        position: relative;
    `,
]);

export const ParallaxBackground = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1300], [0, 170]);
    const y2 = useTransform(scrollY, [0, 2000], [0, -150]);
    const y3 = useTransform(scrollY, [0, 3000], [0, 100]);
    const y4 = useTransform(scrollY, [0, 1100], [0, -200]);
    const y5 = useTransform(scrollY, [0, 2200], [0, -250]);
    const y6 = useTransform(scrollY, [0, 4000], [0, 500]);

    const Illustrations = [
        {
            illustration: <Torun />,
            top: "50%",
            colStart: "10",
            y: y1,
        },
        {
            illustration: <LondonEyeIllustration />,
            top: "341%",
            colStart: "11",
            y: y2,
        },
        {
            illustration: <Drink />,
            width: "98px",
            height: "98.36px",
            top: "380%",
            colStart: "5",
            y: y1,
        },
        {
            illustration: <Vectors />,
            width: "84px",
            height: "84px",
            top: "720%",
            colStart: "8",
            y: y4,
        },
        {
            illustration: <Vinyl />,
            top: "800%",
            colStart: "10",
            y: y2,
        },
        {
            illustration: <Basketball />,
            width: "70px",
            height: "70px",
            top: "900%",
            colStart: "8",
            y: y3,
        },
        {
            illustration: <Malta />,
            width: "107px",
            height: "107px",
            top: "900%",
            colStart: "8",
            y: y2,
        },
        {
            illustration: <Peach />,
            width: "107.81px",
            height: "108.53px",
            top: "850%",
            colStart: "11",
            y: y6,
        },
        {
            illustration: <PixelLove />,
            top: "1400%",
            colStart: "9",
            y: y5,
        },
    ];

    return (
        <IllustrationsContainer>
            {Illustrations.map(
                (
                    {
                        illustration,
                        top,
                        colStart,
                        y,
                        width = "80px",
                        height = "80px",
                    },
                    index
                ) => (
                    <ParallaxCon
                        style={{
                            y,
                            top,
                            gridColumnStart: colStart,
                            width,
                            height,
                        }}
                        key={index}
                    >
                        {illustration}
                    </ParallaxCon>
                )
            )}
        </IllustrationsContainer>
    );
};
