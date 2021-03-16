import { Fragment, useCallback } from "react";
import tw, { css, styled } from "twin.macro";
import { graphql } from "gatsby";
import { MainContainer } from "@components/main-container";
import { Header } from "@components/header";
import { Timeline } from "@components/timeline";
import { Slider } from "@components/slider";
import { motion } from "@components/animation";
import { Link } from "@components/link";
import pageTimelines from "@config/page-timlines";

const transition = {
    duration: 1,
    ease: [0.43, 0.13, 0.23, 0.96],
};

const backVariants = {
    exit: { y: 100, opacity: 0, transition },
    enter: { y: 0, opacity: 1, transition: { delay: 0, ...transition } },
};

const ContentContainer = styled.div(() => [
    tw`relative flex flex-row w-full`,
    css`
        top: 8rem;
    `,
]);

/**
 * Component
 * @param props
 */
export default function Work({ data }): JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const onTimelineItemChange = useCallback((): void => {}, []);

    return (
        <Fragment>
            <motion.div
                className="single"
                initial="exit"
                animate="enter"
                exit="exit"
                variants={backVariants}
            >
                <Header />
                <MainContainer className="lg:pt-20">
                    <ContentContainer>
                        <Slider />
                        <Timeline
                            onTimelineItemChange={onTimelineItemChange}
                            sections={pageTimelines["rem-max"]}
                        />
                        {data.projects.nodes.map((product) => (
                            <Link to={product.nameSlug}>{product.name}</Link>
                        ))}
                    </ContentContainer>
                </MainContainer>
            </motion.div>
        </Fragment>
    );
}

export const query = graphql`
    {
        projects: allProject {
            nodes {
                name
                description
                nameSlug: gatsbyPath(filePath: "/project/{Project.name}")
            }
        }
    }
`;
