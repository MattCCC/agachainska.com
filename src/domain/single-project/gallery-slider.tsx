import { memo, useEffect, useRef } from "react";

import tw, { css, styled } from "twin.macro";

import useMouse from "@react-hook/mouse-position";
import Image from "next/image";

import { FullPageContent } from "components/full-page-content";
import { MotionSlider } from "components/motion-slider";
import { useStoreProp } from "store/index";
import { ProjectSectionImage } from "types/project";

const SliderWrapper = styled.div(() => [tw`cursor-none lg:ml-72`]);

const Element = styled.div(() => [
    tw`max-w-full`,
    tw`w-[250px] lg:w-[820px] lg:h-[550px]`,
    css`
        background: rgba(255, 255, 255, 0.99);
    `,
]);

interface Props {
    images: Array<ProjectSectionImage | null>;
    gap: number;
}

export const GallerySlider = memo(({ images, gap }: Props) => {
    const mouseoverItemRef = useRef(null);
    const mouse = useMouse(mouseoverItemRef, {
        enterDelay: 30,
        leaveDelay: 30,
    });

    const [, { showMotionCursor }] = useStoreProp("motionCursorData");

    useEffect(() => {
        const isMouseOver = Boolean(mouse.elementWidth);

        showMotionCursor(isMouseOver, {
            text: "drag",
            to: "",
            color: !isMouseOver ? "black" : "melrose",
            size: 80,
            overlap: false,
        });
    }, [mouse.elementWidth, showMotionCursor]);

    return (
        <FullPageContent widthPct={100} heightPct="max(560px, 80vh)">
            <SliderWrapper ref={mouseoverItemRef}>
                <MotionSlider gap={gap} displayGrabCursor={false}>
                    {images &&
                        images.map((obj, i) => (
                            <Element key={i}>
                                <Image
                                    src={obj?.image || ""}
                                    alt=""
                                    height="250"
                                    width="820"
                                    sizes="(max-width: 768px) 250px, 550px,
                                (max-width: 1200px) 820px, 550px"
                                />
                            </Element>
                        ))}
                </MotionSlider>
            </SliderWrapper>
        </FullPageContent>
    );
});
