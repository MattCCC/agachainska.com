import { Fragment, useCallback, memo, useState, useEffect } from "react";

import { graphql, PageProps } from "gatsby";
import tw, { styled } from "twin.macro";

import { Header } from "@components/header";
import { MainContainer } from "@components/main-container";
import { Post, PostItem } from "@components/post";
import { Slider, SliderItem } from "@components/slider";
import { Tabs } from "@components/tabs";
import { Timeline, Item, Section } from "@components/timeline";
import { useDelayedLink } from "@hooks/use-delay-link";
import { usePreviousContext } from "@hooks/use-previous-context";

/**
 * Styles
 */
const ContentContainer = styled.div(() => [
    tw`relative lg:grid lg:grid-cols-5 lg:grid-rows-6 lg:gap-y-6 lg:grid-flow-col top-32 lg:top-0 lg:mt-32`,
]);

const SlideWrapper = styled.div(() => [
    tw`col-start-1 col-end-4 col-span-4 row-start-1 row-end-6 row-span-5 hidden lg:block`,
]);

const TimelineWrapper = styled.aside(() => [
    tw`m-auto justify-center col-start-5 row-start-1 row-end-5 row-span-5 hidden lg:block`,
]);

const TabsWrapper = styled.aside(() => [tw`lg:hidden`]);

/**
 * Interfaces
 */
interface NavigationState {
    sliderIndex: number;
    activeSectionId: string;
    activeItemId: string;
    routeTo: string;
    clickEvent: Event;
}

interface Props extends PageProps {
    data: {
        projects: {
            nodes: Project[];
        };
    };
}

/**
 * Component
 * @param props
 */
const Work = memo(
    ({ data }: Props): JSX.Element => {
        const [navigation, setNavigation] = useState({} as NavigationState);
        const prevNavigation = usePreviousContext(navigation);

        const projects = data.projects.nodes || [];

        const timelineList = ["UX", "UI", "Illustrations"].map((category) => ({
            title: category,
            id: category.replace(/\s/gi, "-"),
            category,
            items: projects
                .filter((project: Project) => project.category === category)
                .map((project: Project) => ({
                    name: project.name,
                    id: String(project.uid),
                    routeTo: project.nameSlug,
                    cover: project.cover,
                    category: project.category,
                    description: project.challenge.overview,
                })),
        }));

        const defaultSettings = {
            sectionId: "UI",
            itemId:
                timelineList.find((item) => item.id === "UI")?.items[0]?.id ??
                "1",
            routeTo:
                timelineList.find((item) => item.id === "UI")?.items[0]
                    ?.routeTo ?? "",
        };

        const sliderItems: SliderItem[] = timelineList.reduce(
            (itemsList: Item[], currentValue: Section) => {
                itemsList = [...itemsList, ...(currentValue.items || [])];

                return itemsList;
            },
            []
        );

        const postItems: PostItem[] = timelineList
            .filter(
                (post) =>
                    post.id ===
                    (navigation.activeSectionId || defaultSettings.sectionId)
            )
            .reduce((itemsList: Item[], currentValue: Section) => {
                itemsList = [...itemsList, ...(currentValue.items || [])];

                return itemsList;
            }, []);

        const { onClick: onClickDelayNav } = useDelayedLink({
            to: navigation.routeTo || defaultSettings.routeTo,
        });

        const onTimelineItemChange = useCallback(
            (currentItem: Item): void => {
                if (navigation.activeItemId === currentItem.id) {
                    return;
                }

                const sliderIndex = sliderItems.findIndex(
                    (sliderItem: SliderItem) => sliderItem.id === currentItem.id
                );

                setNavigation({
                    ...navigation,
                    routeTo: currentItem.routeTo,
                    sliderIndex,
                    activeSectionId: currentItem.category,
                    activeItemId: currentItem.id,
                });
            },
            [navigation, sliderItems, setNavigation]
        );

        const onTabChange = useCallback(
            (currentTab: Section): void => {
                if (navigation.activeSectionId === currentTab.id) {
                    return;
                }

                setNavigation({
                    ...navigation,
                    routeTo: "",
                    sliderIndex: -1,
                    activeSectionId: currentTab.category,
                    activeItemId: currentTab.id,
                });
            },
            [navigation]
        );

        const onSliderChange = useCallback(
            (currentItem: SliderItem): void => {
                if (navigation.activeItemId === currentItem.id) {
                    return;
                }

                const sliderIndex = sliderItems.findIndex(
                    (sliderItem: SliderItem) => sliderItem.id === currentItem.id
                );

                setNavigation({
                    ...navigation,
                    routeTo: currentItem.routeTo,
                    sliderIndex,
                    activeSectionId: currentItem.category,
                    activeItemId: currentItem.id,
                });
            },
            [navigation, sliderItems, setNavigation]
        );

        const onSliderTap = useCallback(onClickDelayNav, [onClickDelayNav]);

        const onPostTap = useCallback(
            (e, currentPost: PostItem) => {
                setNavigation({
                    ...navigation,
                    routeTo: currentPost.routeTo,
                    sliderIndex: -1,
                    clickEvent: e,
                });
            },
            [navigation]
        );

        useEffect(() => {
            if (
                !navigation.routeTo ||
                !navigation.clickEvent ||
                prevNavigation.routeTo === navigation.routeTo
            ) {
                return;
            }

            onClickDelayNav(navigation.clickEvent);
        }, [prevNavigation, navigation, onClickDelayNav]);

        return (
            <Fragment>
                <Header />
                <MainContainer className="lg:pt-20">
                    <ContentContainer>
                        <TabsWrapper>
                            <Tabs
                                onTabChange={onTabChange}
                                sections={timelineList}
                                activeSectionId={
                                    navigation.activeSectionId ||
                                    defaultSettings.sectionId
                                }
                                activeItemId={
                                    navigation.activeItemId ||
                                    defaultSettings.itemId
                                }
                            >
                                {postItems.map(
                                    (post: PostItem, index: number) => (
                                        <Post
                                            key={index}
                                            postNum={index + 1}
                                            post={post}
                                            onPostTap={onPostTap}
                                        />
                                    )
                                )}
                            </Tabs>
                        </TabsWrapper>
                        <SlideWrapper>
                            <Slider
                                sliderItems={sliderItems}
                                onSliderTap={onSliderTap}
                                onSliderChange={onSliderChange}
                                slideId={navigation.sliderIndex}
                            />
                        </SlideWrapper>
                        <TimelineWrapper>
                            <Timeline
                                style={{ height: "27.76rem" }}
                                onTimelineItemChange={onTimelineItemChange}
                                sections={timelineList}
                                activeSectionId={
                                    navigation.activeSectionId ||
                                    defaultSettings.sectionId
                                }
                                activeItemId={
                                    navigation.activeItemId ||
                                    defaultSettings.itemId
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
