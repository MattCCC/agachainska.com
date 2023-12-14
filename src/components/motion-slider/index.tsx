import { memo, PropsWithChildren, ReactNode, Children } from "react";

import { MotionProps, Spring, useMotionValue } from "framer-motion";

import { ContextProvider } from "./context";
import { Item } from "./item";
import { Track } from "./track";

export interface Props extends MotionProps {
    padding?: number;
    gap?: number;
    velocity?: number;
    allowSlideToLast?: boolean;
    displayGrabCursor?: boolean;
    transition?: Spring;
    onSlideChange?: (activeSlide: number) => unknown;
}

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
                <div className="overflow-hidden">
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
                        {Children.map(
                            children,
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
                </div>
            </ContextProvider>
        );
    }
);
