import { FunctionComponent } from "react";

import tw, { styled } from "twin.macro";

import { Variants, motion } from "@components/animation";

/**
 * Styles
 */
const Section = styled.section(() => [tw`h-screen relative z-10`]);

/**
 * Interfaces
 */
interface Props {
    initial?: string;
    animate?: string;
    exit?: string;
    className?: string;
    variants?: Variants | undefined;
}

/**
 * Component
 */
export const MainSection: FunctionComponent<Props> = ({
    initial = "",
    animate = "",
    exit = "",
    variants = {},
    children,
    ...props
}) => (
    <motion.div
        initial={initial}
        animate={animate}
        exit={exit}
        variants={variants}
    >
        <Section {...props}>{children}</Section>
    </motion.div>
);
