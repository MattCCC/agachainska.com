import { Fragment, useCallback } from "react";
import tw, { css, styled } from "twin.macro";
import { graphql } from "gatsby";
import { MainContainer } from "@components/main-container";
import { Header } from "@components/header";
import { Timeline } from "@components/timeline";
import { Slider } from "@components/slider";
import { workPageTimeline } from "@config/page-timlines";

/**
 * Styles
 */
const ContentContainer = styled.div(() => [
    tw`relative grid grid-cols-5 grid-rows-6 gap-y-6 grid-flow-col`,
    css`
        margin-top: 8rem;
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
    const onTimelineItemChange = useCallback((): void => {}, []);

    return (
        <Fragment>
            <Header />
            <MainContainer className="lg:pt-20">
                <ContentContainer>
                    <SlideWrapper>
                        <Slider
                            images={[
                                "/img/projects/image-1.png",
                                "/img/projects/danish-bakery.jpg",
                                "/img/projects/placeholder-1.png",
                            ]}
                        />
                    </SlideWrapper>
                    <TimelineWrapper>
                        <Timeline
                            style={{ height: "27.76rem" }}
                            onTimelineItemChange={onTimelineItemChange}
                            sections={workPageTimeline}
                        />
                    </TimelineWrapper>
                </ContentContainer>
            </MainContainer>
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
