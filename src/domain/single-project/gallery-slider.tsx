import { memo, useEffect } from "react";

import { styled } from "twin.macro";
import useMouseLeave from "use-mouse-leave";

import { FullPageContent } from "@components/full-page-content";
import { MotionSlider } from "@components/motion-slider";
import { useStoreProp } from "@store/index";

const Element = styled.div`
    width: 820px;
    height: 550px;
    background: rgba(255, 255, 255, 0.99);
`;

export const GallerySlider = memo(({ ...props }: Record<string, any>) => {
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
            <div ref={itemsRef} style={{ cursor: "none" }}>
                <MotionSlider {...props} displayGrabCursor={false}>
                    <Element>
                        <img src="/img/placeholder-full.png" alt="" />
                    </Element>
                    <Element>
                        <img src="/img/placeholder-full.png" alt="" />
                    </Element>
                    <Element>
                        <img src="/img/placeholder-full.png" alt="" />
                    </Element>
                    <Element>
                        <img src="/img/placeholder-full.png" alt="" />
                    </Element>
                </MotionSlider>
            </div>
        </FullPageContent>
    );
});
