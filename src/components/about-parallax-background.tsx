import React, { useEffect } from "react";
import tw, { css, styled } from "twin.macro";
import Basketball from "svg/Basketball.svg?url";
import Drink from "svg/Drink.svg?url";
import LondonEyeIllustration from "svg/London eye@1x.svg?url";
import Malta from "svg/Malta.svg?url";
import Peach from "svg/Peach.svg?url";
import PixelLove from "svg/Pixel love.svg?url";
import Torun from "svg/Torun.svg?url";
import Vectors from "svg/Vectors.svg?url";
import Vinyl from "svg/Vinyl.svg?url";
import Image from "next/image";

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

const Parallax = styled.div(() => [
    tw`relative`,
    css`
        position: relative;
        transition: transform 0.3s ease-out;
    `,
]);

const loadIllustration = (illustration: string) => {
    switch (illustration) {
        case Torun:
            return <Image src={Torun} alt={""} />;
        case LondonEyeIllustration:
            return <Image src={LondonEyeIllustration} alt={""} />;
        case Drink:
            return <Image src={Drink} alt={""} />;
        case Vectors:
            return <Image src={Vectors} alt={""} />;
        case Vinyl:
            return <Image src={Vinyl} alt={""} />;
        case Basketball:
            return <Image src={Basketball} alt={""} />;
        case Malta:
            return <Image src={Malta} alt={""} />;
        case Peach:
            return <Image src={Peach} alt={""} />;
        case PixelLove:
            return <Image src={PixelLove} alt={""} />;
    }

    return null;
};

const updateParallaxStyle = (
    element: HTMLElement,
    factor: number,
    maxRange: number,
    direction: "up" | "down" = "up"
) => {
    let translateY;
    const scrollY = window.scrollY;

    if (direction === "down") {
        translateY = Math.min(scrollY * factor, maxRange);
    } else {
        translateY = Math.max(-scrollY * factor, -maxRange);
    }

    element.style.transform = `translateY(${translateY}px) translateZ(0)`;
};

export const ParallaxBackground = () => {
    useEffect(() => {
        const illustrations = document.querySelectorAll(
            ".parallax-illustration"
        );

        const factorsTable = [0.2, 0.2, 0.1, 0.2, 0.1, 0.05, 0.05, 0.1, 0.05];
        const upDirectionsTable = [1, 3, 4, 6];
        const maxRangesTable = [170, 150, 100, 200, 150, 100, 150, 500, 250];
        const parallaxSpeed = 1;

        const handleScroll = () => {
            const illustrationsLength = illustrations.length;

            for (let index = 0; index < illustrationsLength; index++) {
                const illustration = illustrations[index];
                const factor = factorsTable[index] || 1;
                const direction = upDirectionsTable.includes(index)
                    ? "up"
                    : "down";

                const maxRange = maxRangesTable[index] || 100;

                updateParallaxStyle(
                    illustration as HTMLElement,
                    factor * parallaxSpeed,
                    maxRange,
                    direction
                );
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const Illustrations = [
        {
            illustration: Torun,
            top: "50%",
            colStart: "10",
        },
        {
            illustration: LondonEyeIllustration,
            top: "341%",
            colStart: "11",
        },
        {
            illustration: Drink,
            width: "98px",
            height: "98.36px",
            top: "370%",
            colStart: "5",
        },
        {
            illustration: Vectors,
            width: "84px",
            height: "84px",
            top: "720%",
            colStart: "8",
        },
        {
            illustration: Vinyl,
            top: "800%",
            colStart: "10",
        },
        {
            illustration: Basketball,
            width: "70px",
            height: "70px",
            top: "900%",
            colStart: "8",
        },
        {
            illustration: Malta,
            width: "107px",
            height: "107px",
            top: "850%",
            colStart: "8",
        },
        {
            illustration: Peach,
            width: "107.81px",
            height: "108.53px",
            top: "850%",
            colStart: "10",
        },
        {
            illustration: PixelLove,
            top: "1200%",
            colStart: "9",
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
                        width = "80px",
                        height = "80px",
                    },
                    index
                ) => (
                    <Parallax
                        className="parallax-illustration"
                        key={index}
                        style={{
                            top,
                            gridColumnStart: colStart,
                            width,
                            height,
                        }}
                    >
                        {loadIllustration(illustration)}
                    </Parallax>
                )
            )}
        </IllustrationsContainer>
    );
};
