import { Fragment, useCallback, memo, useState, useEffect } from "react";

import { graphql, PageProps } from "gatsby";
import tw, { styled } from "twin.macro";

import { Header } from "@components/header";
import { MainContainer } from "@components/main-container";
import { Post, PostItem } from "@components/post";
import { Slider, SliderItem } from "@components/slider";
import { Tabs } from "@components/tabs";
import { Timeline, Item, Section } from "@components/timeline";
import { useNavigation } from "@hooks/use-navigation";
import { useStoreProp } from "@store/index";
import { groupBy } from "@utils/group-by";

interface PageState {
    sliderIndex: number;
    activeSectionId: string;
    activeItemId: string;
    routeTo: string;
    clickEvent: Event;
}

interface TimelineItem {
    name: string;
    id: string;
    routeTo: string;
    cover: string;
    category: string;
    shortDescription: string;
}

interface Props extends PageProps {
    data: {
        projects: {
            nodes: Project[];
        };
    };
}

const ContentContainer = styled.div(() => [
    tw`relative lg:grid lg:grid-cols-5 lg:grid-rows-6 lg:gap-y-6 lg:grid-flow-col top-32 lg:top-0 lg:mt-32`,
]);

const SlideWrapper = styled.div(() => [
    tw`col-start-1 col-end-5 col-span-5 row-start-1 row-end-6 row-span-5 hidden lg:block`,
]);

const TimelineWrapper = styled.aside(() => [
    tw`m-auto justify-center col-start-5 row-start-1 row-end-5 row-span-5 hidden lg:block`,
]);

const Work = memo(
    ({ data }: Props): JSX.Element => {
        const [, dispatch] = useStoreProp("showMotionGrid");
        const [state, setState] = useState({} as PageState);
        const projects = data.projects.nodes || [];
        const categories = Object.keys(groupBy(projects, "category"));

        useEffect(() => {
            dispatch.showMotionGrid(false);
        }, [dispatch]);

        const timelineList = categories.map((category) => ({
            title: category,
            id: category,
            category,
            items: projects
                .filter((project: Project) => project.category === category)
                .map((project: Project) => ({
                    ...project,
                    id: String(project.uid),
                    routeTo: project.nameSlug,
                })),
        }));

        const firstCategory = timelineList[0].category;
        const firstCategoryItems = timelineList.find(
            ({ id }) => id === firstCategory
        )?.items[0];

        const defaultSettings = {
            sectionId: firstCategory,
            itemId: firstCategoryItems?.id ?? "1",
            routeTo: firstCategoryItems?.routeTo ?? "",
        };

        const sliderItems: TimelineItem[] = timelineList.reduce(
            (itemsList: TimelineItem[], currentValue) => {
                itemsList = [...itemsList, ...(currentValue.items || [])];

                return itemsList;
            },
            []
        );

        const projectsByCategory: PostItem[] = sliderItems.filter(
            (post) =>
                post.category ===
                (state.activeSectionId || defaultSettings.sectionId)
        );

        const onNavigate = useNavigation({
            to: state.routeTo || defaultSettings.routeTo,
        });

        const navigateToSlide = useCallback(
            (currentItem: Item | SliderItem): void => {
                if (state.activeItemId === currentItem.id) {
                    return;
                }

                const sliderIndex = sliderItems.findIndex(
                    (sliderItem: SliderItem) => sliderItem.id === currentItem.id
                );

                setState((prevState) => ({
                    ...prevState,
                    routeTo: currentItem.routeTo,
                    sliderIndex,
                    activeSectionId: currentItem.category,
                    activeItemId: currentItem.id,
                }));
            },
            [state, sliderItems, setState]
        );

        const onTabChange = useCallback(
            (currentTab: Section): void => {
                if (state.activeSectionId === currentTab.id) {
                    return;
                }

                setState((prevState) => ({
                    ...prevState,
                    activeSectionId: currentTab.category,
                    activeItemId: currentTab.id,
                }));
            },
            [state]
        );

        return (
            <Fragment>
                <Header />
                <MainContainer className="lg:pt-20">
                    <ContentContainer>
                        <Tabs
                            hideForDesktop={true}
                            onTabChange={onTabChange}
                            sections={timelineList}
                            activeSectionId={
                                state.activeSectionId ||
                                defaultSettings.sectionId
                            }
                            activeItemId={
                                state.activeItemId || defaultSettings.itemId
                            }
                        >
                            {projectsByCategory.map(
                                (post: PostItem, index: number) => (
                                    <Post
                                        key={index}
                                        postNum={index + 1}
                                        post={post}
                                        onPostTap={(e, { routeTo }): any =>
                                            onNavigate(e, routeTo)
                                        }
                                    />
                                )
                            )}
                        </Tabs>
                        <SlideWrapper>
                            <Slider
                                sliderItems={sliderItems}
                                onSliderTap={(e): any => onNavigate(e)}
                                onSliderChange={navigateToSlide}
                                slideId={state.sliderIndex}
                            />
                        </SlideWrapper>
                        <TimelineWrapper>
                            <Timeline
                                style={{ height: "27.76rem" }}
                                onTimelineItemChange={navigateToSlide}
                                sections={timelineList}
                                activeSectionId={
                                    state.activeSectionId ||
                                    defaultSettings.sectionId
                                }
                                activeItemId={
                                    state.activeItemId || defaultSettings.itemId
                                }
                            />
                        </TimelineWrapper>
                    </ContentContainer>
                </MainContainer>
            </Fragment>
        );
    }
);

export default Work;

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
