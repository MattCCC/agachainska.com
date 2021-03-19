import { Fragment, useCallback } from "react";
import tw, { css, styled } from "twin.macro";
import { graphql } from "gatsby";
import { MainContainer } from "@components/main-container";
import { Header } from "@components/header";
import { Timeline } from "@components/timeline";
import { Slider } from "@components/slider";
import { motion } from "@components/animation";
import { workPageTimeline } from "@config/page-timlines";

const transition = {
    duration: 1,
    ease: [0.43, 0.13, 0.23, 0.96],
};

const backVariants = {
    exit: { y: 100, opacity: 0, transition },
    enter: { y: 0, opacity: 1, transition: { delay: 0, ...transition } },
};

const ContentContainer = styled.div(() => [
    tw`relative grid grid-cols-5 grid-rows-6 gap-y-6 grid-flow-col`,
    css`
        top: 8rem;
    `,
]);

const SlideWrapper = styled.div(() => [
    tw`col-start-1 col-end-4 col-span-4 row-start-1 row-end-6 row-span-5`,
]);

const TimelineWrapper = styled.aside(() => [
    tw`m-auto justify-center col-start-5 row-start-1 row-end-5 row-span-5`,
]);

/**
 * Component
 * @param props
 */
export default function Work({ data }): JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const onTimelineItemChange = useCallback((): void => { }, []);

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
                        <SlideWrapper>
                            <Slider images={[
                                "./img/projects/image-1.png",
                                "./img/projects/danish-bakery.jpg",
                                "./img/projects/image-1.png"
                            ]} />
                        </SlideWrapper>
                        <TimelineWrapper>
                            <Timeline
                                onTimelineItemChange={onTimelineItemChange}
                                sections={workPageTimeline}
                            />
                        </TimelineWrapper>
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
                ...ProjectFields
                nameSlug: gatsbyPath(filePath: "/projects/{Project.name}")
            }
        }
    }
`;
