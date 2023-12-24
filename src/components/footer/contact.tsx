import { memo, useCallback } from "react";

import tw, { styled } from "twin.macro";

import { useRouter } from "next/router";

import { Link } from "components/link";
import { MarqueeText } from "components/marquee-text";
import { useStoreProp } from "store/index";
import WavesPattern from "svg/bg-lines.svg";
import PricklyPearIllustration from "svg/Prickly pear@1x.svg?url";
import { getLinkProps } from "utils/route";
import Image from "next/image";

const loadIllustration = (illustration: string) => {
    switch (illustration) {
        case PricklyPearIllustration:
            return <Image src={PricklyPearIllustration} alt={""} />;
    }

    return null;
};

const ContactWrapper = styled(Link)(() => [
    tw`relative block select-none cursor-none`,
    tw`h-[430px] lg:h-[690px]`,
]);

const MarqueeTextWrapper = styled.div(() => [tw`flex w-full h-full mx-auto`]);

const MarqueeTextContainer = styled.span(() => [
    tw`block overflow-hidden select-none bg-clip-text`,
    tw`uppercase text-primary font-fbold text-[60px] lg:text-[120px] whitespace-nowrap`,
    tw`[-webkit-text-stroke-width:3px] [-webkit-text-stroke-color:rgba(255,255,255,0.8)]`,
    tw`leading-[430px] [transition:all_300ms] lg:leading-[690px]`,
]);

const Waves = styled(WavesPattern)(() => [
    tw`absolute w-full h-full opacity-5`,
]);

const PricklyPear = styled.div(() => [
    tw`absolute z-10`,
    tw`w-[50px] h-[50px] left-[45px] top-[29px]`,
    tw`lg:w-[100px] lg:h-[100px] lg:left-[48%] lg:top-[129px]`,
]);

export const Contact = memo(() => {
    const location = useRouter();
    const [, { showMotionCursor }] = useStoreProp("motionCursorData");

    const toggleHoverCursor = useCallback(
        (isMouseOver: boolean) => {
            showMotionCursor(isMouseOver, {
                text: "contact",
                to: "/contact",
                size: 80,
                overlap: false,
                color: isMouseOver ? "melrose" : "black",
            });
        },
        [showMotionCursor]
    );

    const onHoverStart = useCallback(() => {
        toggleHoverCursor(true);
    }, [toggleHoverCursor]);

    const onHoverEnd = useCallback(() => {
        toggleHoverCursor(false);
    }, [toggleHoverCursor]);

    return (
        <div onMouseEnter={onHoverStart} onMouseLeave={onHoverEnd}>
            <ContactWrapper {...getLinkProps("contact", location)}>
                <Waves />
                <PricklyPear>
                    {loadIllustration(PricklyPearIllustration)}
                </PricklyPear>
                <MarqueeTextWrapper as="span">
                    <MarqueeTextContainer>
                        <MarqueeText text="Let’s build something awesome together •" />
                    </MarqueeTextContainer>
                </MarqueeTextWrapper>
            </ContactWrapper>
        </div>
    );
});
