import { memo, useEffect, useState } from "react";

import tw, { css, styled } from "twin.macro";
import useMouseLeave from "use-mouse-leave";

import { Link } from "@components/link";
import { MarqueeText } from "@components/marquee-text";
import { useLocation } from "@reach/router";
import { useStoreProp } from "@store/index";
import { getLinkProps } from "@utils/route";
import { up } from "@utils/screens";

const ContactWrapper = styled(Link)(() => [
    tw`relative block cursor-pointer select-none`,

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
    tw`uppercase text-primary-color font-fbold prose-60 lg:prose-120 whitespace-nowrap`,
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

export const Contact = memo(
    (): JSX.Element => {
        const location = useLocation();
        const [, dispatch] = useStoreProp("currentDelayedRoute");
        const [mouseLeft, itemsRef] = useMouseLeave();
        const [mouseStateIncrement, setMouseStateIncrement] = useState(0);

        useEffect(() => {
            // Ensure that mouse left isn't triggered on mount
            if (!mouseLeft || mouseStateIncrement > 0) {
                if (!mouseStateIncrement) {
                    setMouseStateIncrement(mouseStateIncrement + 1);

                    return;
                }

                dispatch.showMotionCursor(!mouseLeft, {
                    text: "contact",
                    route: "/contact/",
                    size: 80,
                    color: mouseLeft ? "black" : "melrose",
                });
            }
        }, [mouseLeft, mouseStateIncrement, dispatch]);

        return (
            <ContactWrapper {...getLinkProps("contact", location)}>
                <MarqueeTextWrapper as="span" ref={itemsRef}>
                    <MarqueeTextContainer>
                        <MarqueeText text="Build Something Awesome •" />
                    </MarqueeTextContainer>
                </MarqueeTextWrapper>
            </ContactWrapper>
        );
    }
);
