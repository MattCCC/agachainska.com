import { memo, PropsWithChildren, ReactNode, Children } from "react";

import { MotionValue, Spring, useMotionValue } from "framer-motion";
import tw, { styled } from "twin.macro";

import { MotionProps } from "components/animation";

import { ContextProvider } from "./context";
import { Item } from "./item";
import { Track } from "./track";

export interface Props extends MotionProps {
    padding?: number;
    gap?: number;
    velocity?: number;
    overflow?: "hidden";
    allowSlideToLast?: boolean;
    displayGrabCursor?: boolean;
    transition?: Spring;
    onSlideChange?: (activeSlide: number) => unknown;
}

const Wrapper = styled.div(() => [tw`overflow-hidden`]);

const SliderItems = ({
    gap = 0,
    padding = 0,
    x,
    children,
}: PropsWithChildren<{
    gap: number;
    padding: number;
    x: MotionValue<number>;
}>) => (
    <>
        {Children.map(children, (child: ReactNode, i: number) => (
            <Item key={i} gap={gap} padding={padding} index={i} offset={x}>
                {child}
            </Item>
        ))}
    </>
);

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
        onSlideChange = () => null,
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
                        onSlideChange={onSlideChange}
                    >
                        <SliderItems gap={gap} padding={padding} x={x}>
                            {children}
                        </SliderItems>
                    </Track>
                </Wrapper>
            </ContextProvider>
        );
    }
);
