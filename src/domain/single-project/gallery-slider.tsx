import { memo, useEffect, useRef } from "react";

import tw, { css, styled } from "twin.macro";

import useMouse from "@react-hook/mouse-position";

import { FullPageContent } from "components/full-page-content";
import { MotionSlider } from "components/motion-slider";
import { useStoreProp } from "store/index";

const SliderWrapper = styled.div(() => [tw`cursor-none lg:ml-72`]);

const Element = styled.div(() => [
    tw`max-w-full`,
    tw`w-[250px] lg:w-[820px] lg:h-[550px]`,
    css`
        background: rgba(255, 255, 255, 0.99);
    `,
]);

export const GallerySlider = memo(
    ({ images, gap }: { images: ProjectSectionImage[]; gap: number }) => {
        const mouseoverItemRef = useRef(null);
        const mouse = useMouse(mouseoverItemRef, {
            enterDelay: 30,
            leaveDelay: 30,
        });

        const [, { showMotionCursor }] = useStoreProp("showMotionCursor");

        useEffect(() => {
            const isMouseOver = Boolean(mouse.elementWidth);

            showMotionCursor(isMouseOver, {
                text: "drag",
                route: "",
                color: !isMouseOver ? "black" : "melrose",
                size: 80,
                overlap: false,
            });
        }, [mouse.elementWidth, showMotionCursor]);

        return (
            <FullPageContent widthPct={100} border={false}>
                <SliderWrapper ref={mouseoverItemRef}>
                    <MotionSlider gap={gap} displayGrabCursor={false}>
                        {images.map(({ image }, i) => (
                            <Element key={i}>
                                <img src={image} alt="" />
                            </Element>
                        ))}
                    </MotionSlider>
                </SliderWrapper>
            </FullPageContent>
        );
    }
);
