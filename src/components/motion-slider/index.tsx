import { memo, PropsWithChildren, ReactNode } from "react";

import { Spring, useMotionValue } from "framer-motion";
import tw, { styled } from "twin.macro";

import { MotionProps } from "@components/animation";

import { ContextProvider } from "./context";
import { Item } from "./item";
import { Track } from "./track";

export interface Props extends MotionProps {
    children: ReactNode;
    padding?: number;
    gap?: number;
    velocity?: number;
    overflow?: "hidden";
    allowSlideToLast?: boolean;
    displayGrabCursor?: boolean;
    transition?: Spring;
}

const Wrapper = styled.div(() => [tw`overflow-hidden`]);

export const MotionSlider = memo(
    ({
        padding = 0,
        gap = 40,
        velocity = 0.3,
        transition = {
            type: "spring",
            stiffness: 300,
            damping: 200,
            mass: 2,
        } as Spring,
        allowSlideToLast = false,
        displayGrabCursor = true,
        children,
    }: PropsWithChildren<Props>) => {
        const x = useMotionValue(0);

        return (
            <ContextProvider>
                <Wrapper>
                    <Track
                        padding={padding}
                        gap={gap}
                        velocity={velocity}
                        transition={transition}
                        allowSlideToLast={allowSlideToLast}
                        displayGrabCursor={displayGrabCursor}
                        style={{ x }}
                    >
                        {children &&
                            (children as any[]).map(
                                (child: ReactNode, i: number) => (
                                    <Item
                                        key={i}
                                        gap={gap}
                                        padding={padding}
                                        index={i}
                                        offset={x}
                                    >
                                        {child}
                                    </Item>
                                )
                            )}
                    </Track>
                </Wrapper>
            </ContextProvider>
        );
    }
);
