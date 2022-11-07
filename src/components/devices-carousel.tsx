import { memo, useEffect, useRef } from "react";

import tw, { css, styled } from "twin.macro";

import useMouse from "@react-hook/mouse-position";

import { useStoreProp } from "store/index";

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
                overlap: !isMouseOver,
            });
        }, [mouse.elementWidth, showMotionCursor]);

        return (
            <FullPageContent
                widthPct={100}
                heightPct={"670px"}
                border={false}
                style={{ height: "680px", marginBottom: "0" }}
            >
                <SliderWrapper ref={mouseoverItemRef}>
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
