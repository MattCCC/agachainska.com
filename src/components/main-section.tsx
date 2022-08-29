import { PropsWithChildren } from "react";

import tw, { styled } from "twin.macro";

import { Variants, motion } from "@components/animation";

const Section = styled.section(() => [tw`relative z-10 h-screen`]);

interface Props {
    initial?: string;
    animate?: string;
    exit?: string;
    className?: string;
    variants?: Variants;
}

export const MainSection = ({
    initial = "",
    animate = "",
    exit = "",
    variants = {},
    children,
    ...props
}: PropsWithChildren<Props>) => (
    <motion.div
        initial={initial}
        animate={animate}
        exit={exit}
        variants={variants}
    >
        <Section {...props}>{children}</Section>
    </motion.div>
);
