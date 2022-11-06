import { useStoreProp } from "@store/index";
import { memo, useEffect } from "react";

import tw, { css, styled } from "twin.macro";
import useMouseLeave from "use-mouse-leave";

import { DeviceMockup } from "./device-mockup";
import { FullPageContent } from "./full-page-content";
import { MotionSlider } from "./motion-slider";

const SliderWrapper = styled.div(() => [
    tw`cursor-none lg:ml-[13rem]`,
    css`
        & > div {
            ${tw`overflow-visible`}
        }
    `,
]);

export const DevicesCarousel = memo(
    ({ list }: { list: ProjectSectionElementDevice[] }) => {
        const [, dispatch] = useStoreProp("currentDelayedRoute");
        const [mouseLeft, itemsRef] = useMouseLeave();

        useEffect(() => {
            console.log("🚀 ~ useEffect ~ mouseLeft", mouseLeft);
            dispatch.showMotionCursor(!mouseLeft, {
                text: "drag",
                route: "",
                color: mouseLeft ? "black" : "melrose",
                size: 80,
                overlap: mouseLeft,
            });
        }, [mouseLeft, dispatch]);

        return (
            <FullPageContent widthPct={100} heightPct={"670px"} border={false}>
                <SliderWrapper ref={itemsRef}>
                    <MotionSlider displayGrabCursor={false}>
                        {list.map(({ type, link }, i) => (
                            <DeviceMockup key={i} type={type} link={link} />
                        ))}
                    </MotionSlider>
                </SliderWrapper>
            </FullPageContent>
        );
    }
);
