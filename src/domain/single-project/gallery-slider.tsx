import { memo, useEffect } from "react";

import tw, { css, styled } from "twin.macro";
import useMouseLeave from "use-mouse-leave";

import { FullPageContent } from "@components/full-page-content";
import { MotionSlider } from "@components/motion-slider";
import { useStoreProp } from "@store/index";

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
        const [, dispatch] = useStoreProp("currentDelayedRoute");
        const [mouseLeft, itemsRef] = useMouseLeave();

        useEffect(() => {
            dispatch.showMotionCursor(!mouseLeft, {
                text: "drag",
                route: "",
                color: mouseLeft ? "black" : "melrose",
                size: 80,
                overlap: mouseLeft,
            });
        }, [mouseLeft, dispatch]);

        return (
            <FullPageContent widthPct={100} border={false}>
                <SliderWrapper ref={itemsRef}>
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
