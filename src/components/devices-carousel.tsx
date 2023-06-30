import { memo, useState, useCallback, useMemo } from "react";

import tw, { css, styled } from "twin.macro";

import { motion } from "framer-motion";
import { useStoreProp } from "store/index";

import { DeviceMockup } from "./device-mockup";
import { FullPageContent } from "./full-page-content";
import { MotionSlider } from "./motion-slider";

const SliderWrapper = styled.div(() => [
    tw`cursor-none lg:ml-[13rem] mb-[40px]`,
    css`
        & > div {
            ${tw`overflow-visible`}
        }
    `,
]);

const ProgressWrapper = styled.div(() => [
    tw`relative w-full max-w-[510px] pb-[1px] lg:ml-[13rem]`,
]);

const Background = styled.div(() => [
    tw`absolute bottom-0 left-0 z-10 w-full`,
    tw`h-[2px]`,
    css`
        background: rgba(192, 164, 255, 0.3);
    `,
]);

const Progress = styled(motion.div)(() => [
    tw`absolute bottom-0 left-0 z-20 h-px`,
    css`
        box-shadow: 0 2px 4px 0 var(--melrose);
        background: rgba(192, 164, 255, 0.7);
    `,
]);

const ProgressText = styled.div(() => [
    tw`mb-[13px] lg:mb-[18px] text-right text-[16px] lg:text-[20px] text-melrose`,
    css`
        text-shadow: 0 2px 4px 0 var(--melrose);
    `,
]);

interface Props {
    list:
        | Array<{ type: string; link: string } | null | undefined>
        | null
        | undefined;
}

export const DevicesCarousel = memo(({ list }: Props) => {
    const numItems = list?.length || 0;
    const itemWidth = 100 / numItems;
    const [x, setX] = useState(1);

    const [, dispatch] = useStoreProp("isMotionCursorVisible");

    const onSlideChange = useCallback((activeItem: number) => {
        setX(activeItem + 1);
    }, []);

    const toggleHoverCursor = useCallback(
        (isMouseOver: boolean) => {
            dispatch.showMotionCursor(isMouseOver, {
                text: "drag",
                to: "",
                color: !isMouseOver ? "black" : "melrose",
                size: 80,
                overlap: !isMouseOver,
            });
        },
        [dispatch]
    );

    const onHoverStart = useCallback(() => {
        toggleHoverCursor(true);
    }, [toggleHoverCursor]);

    const onHoverEnd = useCallback(() => {
        toggleHoverCursor(false);
    }, [toggleHoverCursor]);

    const progressPosition = useMemo(() => {
        const position = itemWidth * (x - 1);

        return {
            left: position + "%",
        };
    }, [itemWidth, x]);

    if (!list) {
        return null;
    }

    return (
        <FullPageContent heightPct="680px">
            <motion.div
                onHoverStart={onHoverStart}
                onHoverEnd={onHoverEnd}
                tw="lg:ml-[13rem]"
            >
                <SliderWrapper>
                    <MotionSlider
                        displayGrabCursor={false}
                        onSlideChange={onSlideChange}
                        style={{ overflow: "visible" }}
                    >
                        {(list || []).map(
                            (device, i) =>
                                device && (
                                    <DeviceMockup
                                        key={i}
                                        type={device.type}
                                        link={device.link}
                                    />
                                )
                        )}
                    </MotionSlider>
                </SliderWrapper>
            </motion.div>

            <ProgressWrapper key={x}>
                <ProgressText>
                    {x}/{numItems}
                </ProgressText>

                <Background />
                <Progress
                    initial={progressPosition}
                    animate={progressPosition}
                    style={{ width: `${itemWidth}%` }}
                />
            </ProgressWrapper>
        </FullPageContent>
    );
});
