import { memo, useEffect, useRef } from "react";

import tw, { css, styled } from "twin.macro";

import useMouse from "@react-hook/mouse-position";

import { Link } from "components/link";
import { MarqueeText } from "components/marquee-text";
import { useStoreProp } from "store/index";
import { ReactComponent as WavesPattern } from "svg/bg-lines.svg";
import { ReactComponent as PricklyPearIllustration } from "svg/Prickly pear@1x.svg";
import { getLinkProps } from "utils/route";
import { up } from "utils/screens";
import { useRouter } from "next/router";

const ContactWrapper = styled(Link)(() => [
    tw`relative block select-none cursor-none`,

    css`
        height: 430px;

        ${up("lg")} {
            height: 690px;
        }
    `,
]);

const MarqueeTextWrapper = styled.div(() => [tw`flex w-full h-full mx-auto`]);

const MarqueeTextContainer = styled.span(() => [
    tw`block overflow-hidden select-none bg-clip-text`,
    tw`uppercase text-primary font-fbold prose-60 lg:prose-120 whitespace-nowrap`,
    css`
        -webkit-text-stroke-width: 3px;
        -webkit-text-stroke-color: rgba(255, 255, 255, 0.8);
        line-height: 430px;
        transition: all 300ms;

        ${up("lg")} {
            line-height: 690px;
        }
    `,
]);

const Waves = styled(WavesPattern)(() => [
    tw`absolute w-full h-full opacity-5`,
]);

const PricklyPear = styled(PricklyPearIllustration)(() => [
    tw`absolute z-10`,
    css`
        width: 50px;
        height: 50px;
        left: 45px;
        top: 29px;

        ${up("lg")} {
            width: 100px;
            height: 100px;
            left: 48%;
            top: 129px;
        }
    `,
]);

export const Contact = memo(() => {
    const location = useRouter();
    const mouseoverItemRef = useRef(null);
    const mouse = useMouse(mouseoverItemRef, {
        enterDelay: 30,
        leaveDelay: 30,
    });

    const [, { showMotionCursor }] = useStoreProp("showMotionCursor");

    useEffect(() => {
        const isMouseOver = Boolean(mouse.elementWidth);

        showMotionCursor(isMouseOver, {
            text: "contact",
            route: "/contact/",
            size: 80,
            overlap: false,
            color: isMouseOver ? "melrose" : "block",
        });
    }, [mouse.elementWidth, showMotionCursor]);

    return (
        <div ref={mouseoverItemRef}>
            <ContactWrapper {...getLinkProps("contact", location)}>
                <Waves />
                <PricklyPear />
                <MarqueeTextWrapper as="span">
                    <MarqueeTextContainer>
                        <MarqueeText text="Let’s build something awesome together •" />
                    </MarqueeTextContainer>
                </MarqueeTextWrapper>
            </ContactWrapper>
        </div>
    );
});
