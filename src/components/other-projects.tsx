import { useLayoutEffect, useRef } from "react";

import tw, { css, styled } from "twin.macro";
import { Project } from "types/project";

import { PostItem } from "components/post";

import OtherProject from "./other-project";

export interface OtherProjectProp {
    category: string;
    projects?: Project[];
}

interface Props {
    otherProjects: OtherProjectProp[];
    lastProjectNumber: number;
    animate?: boolean;
}

const OtherProjectsContainer = styled.div(() => [
    tw`grid grid-cols-2 -mt-16 opacity-0 gap-x-28 gap-y-0`,
    css`
        &.initial {
            transition:
                opacity 0.6s ease,
                transform 0.15s cubic-bezier(0.43, 0.13, 0.23, 0.96);
            transform: translateY(1000px);
        }

        &.enter {
            transform: translateY(0) translateZ(0);
            opacity: 1;
        }

        & > div:nth-of-type(even) {
            padding-top: 6rem;
        }
    `,
]);

export default function OtherProjects({
    otherProjects,
    lastProjectNumber,
    animate = false,
}: Readonly<Props>) {
    const container = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!animate) {
            return;
        }

        setTimeout(() => {
            if (container.current) {
                container.current.classList.add("enter");
            }
        }, 100);
    }, [animate]);

    return (
        <OtherProjectsContainer
            ref={container}
            className={animate ? "initial" : ""}
        >
            {otherProjects &&
                otherProjects.length > 0 &&
                otherProjects[0]?.projects?.map(
                    (post: PostItem, index: number) => (
                        <OtherProject
                            otherProject={post}
                            currentIndex={index}
                            lastProjectNumber={lastProjectNumber}
                            key={"index-" + post.name + lastProjectNumber}
                        />
                    )
                )}
        </OtherProjectsContainer>
    );
}
