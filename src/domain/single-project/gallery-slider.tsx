import { memo, useEffect } from "react";

import tw, { css, styled } from "twin.macro";
import useMouseLeave from "use-mouse-leave";

import { FullPageContent } from "@components/full-page-content";
import { MotionSlider } from "@components/motion-slider";
import { useStoreProp } from "@store/index";
import { up } from "@utils/screens";

const SliderWrapper = styled.div(() => [tw`cursor-none lg:ml-72`]);

const Element = styled.div(() => [
    tw`max-w-full`,
    css`
        width: 250px;
        ${up("lg")} {
            width: 820px;
            height: 550px;
        }
        background: rgba(255, 255, 255, 0.99);
    `,
]);

export const GallerySlider = memo(
    ({ images, ...props }: { images: ProjectImage[] }) => {
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
                    <MotionSlider {...props} displayGrabCursor={false}>
                        {images.map(({ image }) => (
                            <Element>
                                <img src={image} alt="" />
                            </Element>
                        ))}
                    </MotionSlider>
                </SliderWrapper>
            </FullPageContent>
        );
    }
);
