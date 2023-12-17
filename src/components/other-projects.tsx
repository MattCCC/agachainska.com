import { useEffect, useRef } from "react";

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
                transform 0.3s cubic-bezier(0.43, 0.13, 0.23, 0.96);
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

    useEffect(() => {
        if (!animate) {
            return;
        }

        document.body.classList.add("overflow-hidden");

        setTimeout(() => {
            if (container.current) {
                container.current.classList.add("enter");
            }

            setTimeout(() => {
                document.body.classList.remove("overflow-hidden");
            }, 300);
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
