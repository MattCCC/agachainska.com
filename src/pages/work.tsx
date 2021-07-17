import { Fragment, useCallback, memo, useState } from "react";

import { graphql, PageProps } from "gatsby";
import tw, { css, styled } from "twin.macro";

import { BigNumber } from "@components/big-number";
import { MainContainer } from "@components/main-container";
import { MotionCursor } from "@components/motion-cursor";
import { Post, PostItem } from "@components/post";
import { Slider, SliderItem } from "@components/slider";
import { Star } from "@components/star";
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
    showStar: boolean;
    showNumber: boolean;
    currentProject?: Item | SliderItem;
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

const ContentContainer = styled.section(() => [
    tw`relative col-start-1 col-end-13 mt-16 lg:col-start-2 lg:grid lg:grid-cols-5 lg:grid-rows-6 lg:gap-y-6 lg:grid-flow-col`,
]);

const SlideWrapper = styled.div(() => [
    tw`relative hidden col-span-5 col-start-1 col-end-5 row-span-5 row-start-1 row-end-6 lg:block`,
]);

const TimelineWrapper = styled.aside(() => [
    tw`justify-center hidden col-start-5 row-span-5 row-start-1 row-end-5 m-auto lg:block`,
]);

const StyledNumber = styled(BigNumber)(() => [
    tw`absolute right-0 z-20 select-none`,
    css`
        bottom: -33px;
        height: 260px;
    `,
]);

const StyledStar = styled(Star)(() => [
    tw`absolute z-20 select-none`,
    css`
        right: -60px;
        bottom: -65px;
        height: 260px;
        width: 260px;
    `,
]);

const categoryColors = {
    "UX/UI": "#F5A4FF",
    // eslint-disable-next-line quote-props
    Illustrations: "#C0A4FF",
} as {
    [x: string]: string;
};

const Work = memo(
    ({ data }: Props): JSX.Element => {
        const [, dispatch] = useStoreProp("showMotionGrid");
        const projects = data.projects.nodes || [];
        const categories = Object.keys(groupBy(projects, "category"));

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
        const firstCategoryFirstItem = timelineList.find(
            ({ id }) => id === firstCategory
        )?.items[0];

        const [state, setState] = useState({
            sliderIndex: 0,
            showStar: false,
            showNumber: true,
            currentProject: firstCategoryFirstItem,
            activeSectionId: firstCategory,
            activeItemId: firstCategoryFirstItem?.id ?? "1",
            routeTo: firstCategoryFirstItem?.routeTo ?? "",
        } as PageState);

        const sliderItems: TimelineItem[] = timelineList.reduce(
            (itemsList: TimelineItem[], currentValue) => {
                itemsList = [...itemsList, ...(currentValue.items || [])];

                return itemsList;
            },
            []
        );

        const projectsByCategory: PostItem[] = sliderItems.filter(
            (post) => post.category === state.activeSectionId
        );

        const onNavigate = useNavigation({
            to: state.routeTo,
        });

        const setCurrentSlide = useCallback(
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
                    currentProject: currentItem,
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

        // Cursor CTA
        const onSliderContentMouseEventChange = useCallback(
            (mouseDidLeave = false) => {
                dispatch.showMotionCursor(!mouseDidLeave, {
                    text: "explore",
                    route: state.routeTo,
                });

                setState((prevState) => ({
                    ...prevState,
                    showStar: !mouseDidLeave,
                    showNumber: mouseDidLeave,
                }));
            },
            [dispatch, state.routeTo]
        );

        return (
            <Fragment>
                <MotionCursor />

                <MainContainer topPadding={true}>
                    <ContentContainer>
                        <SlideWrapper>
                            <StyledNumber
                                value={`${state.sliderIndex + 1}.`}
                                viewBox="0 0 280 200"
                                displayOnRight={true}
                                style={{
                                    display: state.showNumber
                                        ? "block"
                                        : "none",
                                }}
                            />
                            <StyledStar
                                text={
                                    state?.currentProject?.shortDescription ||
                                    ""
                                }
                                color={
                                    state?.currentProject?.category &&
                                    categoryColors[
                                        state.currentProject.category
                                    ]
                                }
                                displayStar={state.showStar}
                            />
                            <Slider
                                sliderItems={sliderItems}
                                onSliderTap={(e): any => onNavigate(e)}
                                onSliderChange={setCurrentSlide}
                                slideId={state.sliderIndex}
                                onSliderMouseEnter={
                                    onSliderContentMouseEventChange
                                }
                                onSliderMouseLeave={
                                    onSliderContentMouseEventChange
                                }
                            />
                        </SlideWrapper>
                        <TimelineWrapper>
                            <Timeline
                                style={{ height: "27.76rem" }}
                                onTimelineItemChange={setCurrentSlide}
                                sections={timelineList}
                                activeSectionId={state.activeSectionId}
                                activeItemId={state.activeItemId}
                            />
                        </TimelineWrapper>
                        <Tabs
                            hideForDesktop={true}
                            onTabChange={onTabChange}
                            sections={timelineList}
                            activeSectionId={state.activeSectionId}
                            activeItemId={state.activeItemId}
                        />
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
                nameSlug: gatsbyPath(filePath: "/projects/{project.name}")
            }
        }
    }
`;
