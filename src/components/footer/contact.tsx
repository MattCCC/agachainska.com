import { memo, useEffect, useRef, useState } from "react";

import tw, { css, styled } from "twin.macro";

import { useLocation } from "@reach/router";
import useMouse from "@react-hook/mouse-position";

import { Link } from "components/link";
import { MarqueeText } from "components/marquee-text";
import { useStoreProp } from "store/index";
import { getLinkProps } from "utils/route";
import { up } from "utils/screens";

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

export const Contact = memo(() => {
    const location = useLocation();
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
                <MarqueeTextWrapper as="span">
                    <MarqueeTextContainer>
                        <MarqueeText text="Let’s build something awesome together •" />
                    </MarqueeTextContainer>
                </MarqueeTextWrapper>
            </ContactWrapper>
        </div>
    );
});
