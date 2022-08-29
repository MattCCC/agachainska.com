import { useEffect } from "react";

import { motion, useAnimation } from "framer-motion";
import tw, { css, styled } from "twin.macro";

import { PostItem } from "@components/post";

import OtherProject from "./other-project";

export interface OtherProjectProp {
    category: string;
    projects?: Project[];
}

interface Props {
    otherProjects: OtherProjectProp[];
    lastProjectNumber: number;
    isShowingOtherProjects: boolean;
}

const duration = 0.15;

const transition = {
    ease: [0.43, 0.13, 0.23, 0.96],
};

const OtherProjectsAnimVariants = {
    initial: {
        opacity: "0",
        y: 200,
        transition: { ...transition, duration: 0 },
    },
    enter: {
        opacity: "0",
        y: 200,
        transition: { ...transition, duration },
    },
    end: {
        opacity: "1",
        y: 0,
        transition: { ...transition, duration: 0 },
    },
};

const OtherProjectsContainer = styled(motion.div)(() => [
    tw`grid grid-cols-2 -mt-16 duration-150 gap-x-28 gap-y-0`,
    css`
        & > div:nth-of-type(even) {
            padding-top: 6rem;
        }

        h2[class*="MainTitleTop"] {
            font-size: 52px;
        }
    `,
]);

export default function OtherProjects({
    otherProjects,
    lastProjectNumber,
    isShowingOtherProjects,
}: Props) {
    const otherProjectsAnimControls = useAnimation();

    // Orchestrate animation when switching the route
    useEffect(() => {
        if (isShowingOtherProjects) {
            (async (): Promise<void> => {
                await otherProjectsAnimControls.start(
                    (variant) => variant.initial
                );
                await otherProjectsAnimControls.start(
                    (variant) => variant.enter
                );

                setTimeout(async () => {
                    await otherProjectsAnimControls.start(
                        (variant) => variant.end
                    );
                }, duration * 1000);
            })();
        }
    }, [isShowingOtherProjects, otherProjectsAnimControls]);

    return (
        <OtherProjectsContainer
            className="opacity-0"
            key="otherProjectsAnimation"
            variants={OtherProjectsAnimVariants}
            custom={OtherProjectsAnimVariants}
            animate={otherProjectsAnimControls}
            initial="initial"
        >
            {otherProjects[0].projects?.map((post: PostItem, index: number) => (
                <OtherProject
                    otherProject={post}
                    currentIndex={index}
                    lastProjectNumber={lastProjectNumber}
                    key={index + lastProjectNumber}
                />
            ))}
        </OtherProjectsContainer>
    );
}
