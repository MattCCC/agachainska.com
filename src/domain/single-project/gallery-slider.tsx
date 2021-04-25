import { memo } from "react";

import { styled } from "twin.macro";

import { FullPageContent } from "@components/full-page-content";
import { MotionSlider } from "@components/motion-slider";

const Element = styled.div`
    width: 820px;
    height: 550px;
    background: rgba(255, 255, 255, 0.99);
`;

export const GallerySlider = memo(({ ...props }: Record<string, any>) => (
    <FullPageContent widthPct={100} border={false}>
        <MotionSlider {...props}>
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
    </FullPageContent>
));
