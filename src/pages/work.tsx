import { Fragment, useCallback, memo, useState } from "react";

import { graphql, PageProps } from "gatsby";
import tw, { styled } from "twin.macro";

import { Header } from "@components/header";
import { MainContainer } from "@components/main-container";
import { Slider, SliderItem } from "@components/slider";
import { TabsBar } from "@components/tabs-bar";
import { Timeline, Item, Section } from "@components/timeline";
import { useDelayedLink } from "@hooks/use-delay-link";

/**
 * Styles
 */
const ContentContainer = styled.div(() => [
    tw`relative grid grid-cols-1 grid-rows-2 lg:grid-cols-5 lg:grid-rows-6 lg:gap-y-6 lg:grid-flow-col top-32 lg:top-0 lg:mt-32`,
]);

const SlideWrapper = styled.div(() => [
    tw`col-start-1 col-end-4 col-span-4 row-start-1 row-end-6 row-span-5 hidden lg:block`,
]);

const TimelineWrapper = styled.aside(() => [
    tw`m-auto justify-center col-start-5 row-start-1 row-end-5 row-span-5 hidden lg:block`,
]);

const TabsWrapper = styled.aside(() => [
    tw`col-start-1 row-start-1 lg:hidden`,
]);

/**
 * Interfaces
 */
interface NavigationState {
    sliderIndex: number;
    activeSectionId: string;
    activeItemId: string;
    routeTo: string;
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

        const projects = data.projects.nodes || [];

        const timelineList = ["UX", "UI", "Illustrations"].map((category) => ({
            title: category,
            id: category.replace(/\s/gi, "-"),
            items: projects
                .filter((project: Project) => project.category === category)
                .map((project: Project) => ({
                    name: project.name,
                    id: String(project.uid),
                    routeTo: project.nameSlug,
                    cover: project.cover,
                    category: project.category,
                })),
        }));

        const sliderItems: SliderItem[] = timelineList
            .reduce(
                (itemsList: Item[], currentValue: Section) => {
                    itemsList = [...itemsList, ...(currentValue.items || [])];

                    return itemsList;
                },
                []
            );

        const defaultSettings = {
            sectionId: "UI",
            itemId: timelineList.find((item) => item.id === "UI")?.items[0]?.id ?? "1",
            routeTo: timelineList.find((item) => item.id === "UI")?.items[0]?.routeTo ?? ""
        };

        const { onClick: onClickDelayNav } = useDelayedLink({
            to: navigation.routeTo || defaultSettings.routeTo
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

        const onSliderTap = useCallback(onClickDelayNav,
            [onClickDelayNav]
        );

        return (
            <Fragment>
                <Header />
                <MainContainer className="lg:pt-20">
                    <ContentContainer>
                        <TabsWrapper>
                            <TabsBar
                                onTabChange={onTabChange}
                                sections={timelineList}
                                activeSectionId={
                                    navigation.activeSectionId || defaultSettings.sectionId
                                }
                                activeItemId={navigation.activeItemId || defaultSettings.itemId}
                            />
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
                                    navigation.activeSectionId || defaultSettings.sectionId
                                }
                                activeItemId={navigation.activeItemId || defaultSettings.itemId}
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
