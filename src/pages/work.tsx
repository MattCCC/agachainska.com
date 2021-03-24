import { Fragment, useCallback, useEffect, useState } from "react";

import { graphql, navigate } from "gatsby";
import tw, { css, styled } from "twin.macro";

import { Header } from "@components/header";
import { MainContainer } from "@components/main-container";
import { Slider } from "@components/slider";
import { Timeline, Item, Section } from "@components/timeline";

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
    const onTimelineItemChange = useCallback((currentItem: Item): void => { }, []);

    const [timelineList, setTimelineList] = useState([] as Section[]);

    useEffect(() => {
        const projects = data.projects.nodes || [];

        setTimelineList(
            ["UX", "UI", "Illustrations"].map((category) => ({
                title: category,
                id: category.toLowerCase().replace(/\s/gi, "-"),
                items: projects
                    .filter((project: Project) => project.category === category)
                    .map((project: Project) => ({
                        name: project.name,
                        id: project.name.toLowerCase().replace(/\s/gi, "-"),
                        routeTo: project.nameSlug,
                    })),
            }))
        );
    }, [data, setTimelineList]);

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
                            sections={timelineList}
                            activeSectionId="UI"
                            activeItemId="re/max"
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
