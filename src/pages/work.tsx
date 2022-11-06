import {
    Fragment,
    useCallback,
    memo,
    useState,
    RefObject,
    useMemo,
    useEffect
} from "react";

import { graphql, PageProps } from "gatsby";
import tw, { css, styled } from "twin.macro";
import { useDebouncedCallback } from "use-debounce";

import { BigNumber } from "@components/big-number";
import { MainContainer } from "@components/main-container";
import { Meta } from "@components/meta";
import { MotionCursor } from "@components/motion-cursor";
import { Post, PostItem } from "@components/post";
import { Slider, SliderItem } from "@components/slider";
import { Star } from "@components/star";
import { Tabs } from "@components/tabs";
import { Timeline, Item, Section } from "@components/timeline";
import { useEventListener } from "@hooks/use-event-listener";
import { useNavigation } from "@hooks/use-navigation";
import { useWindowSize } from "@hooks/use-window-size";
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
    projectNumberToShow: number;
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

interface SliderWrapperProps {
    isShowingOtherProjects: boolean;
}

const ContentContainer = styled.section(() => [
    tw`relative col-start-1 col-end-13 lg:mt-16 lg:col-start-2 lg:grid lg:grid-cols-5 lg:gap-y-6 lg:grid-flow-col`,
]);

const SlideWrapper = styled.div(
    ({ isShowingOtherProjects }: SliderWrapperProps) => [
        tw`relative hidden col-span-5 col-start-1 col-end-5 lg:block`,
        isShowingOtherProjects && tw`h-full`,
    ]
);

const TimelineWrapper = styled.aside(() => [
    tw`justify-center hidden col-start-5 row-span-5 row-start-1 row-end-5 lg:block`,
]);

const StyledNumber = styled(BigNumber)(() => [
    tw`absolute right-0 z-20 select-none`,
    css`
        bottom: 16px;
        height: 260px;
    `,
]);

const StyledStar = styled(Star)(() => [
    tw`absolute z-20 select-none`,
    css`
        right: -55px;
        bottom: -15px;
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

let isPageTop = false;
let isPageBottom = false;

const Work = memo(({ data }: Props) => {
    const windowSize = useWindowSize();
    const hasSmallWindowWidth = windowSize.width < 1024;

    const [isShowingOtherProjects, setIsShowingOtherProjects] = useState(false);
    const [isSliderAnimating, setIsSliderAnimating] = useState(false);
    const [, dispatch] = useStoreProp("showMotionGrid");
    const [backgroundColor, dispatchbackgroundColor] = useStoreProp("backgroundColor");
    const projects = useMemo(
        () => data.projects.nodes || [],
        [data.projects.nodes]
    );

    const categories = useMemo(
        () => Object.keys(groupBy(projects, "category")) as ProjectCategory[],
        [projects]
    );

    const timelineList = useMemo(
        () =>
            categories.map((category) => {
                // Check if category has projects that have no case studies.
                const hasOtherProjects = projects.findIndex(
                    (project) =>
                        project.category === category &&
                        project.subCategory === "Others"
                );

                const updatedCategory = {
                    title: category,
                    id: category,
                    category,
                    items: projects
                        .filter(
                            (project: Project) =>
                                project.category === category &&
                                project.subCategory !== "Others"
                        )
                        .map((project: Project) => ({
                            ...project,
                            title: project.name,
                            id: String(project.uid),
                            routeTo: project.nameSlug,
                        })),
                };

                if (hasOtherProjects && !hasSmallWindowWidth) {
                    updatedCategory.items.push({
                        id: `others${category}`,
                        routeTo: "",
                        uid: 99999,
                        bgColor: "",
                        title: "Others",
                        name: "Others",
                        cover: "",
                        subCategory: "Others",
                        nameSlug: "",
                        category,
                        client: "",
                        agency: "",
                        timeframe: "",
                        roleInProject: "",
                        shortDescription: "",
                        sections: [],
                    });
                }

                return updatedCategory;
            }),
        [categories, hasSmallWindowWidth, projects]
    );

    const otherProjects = useMemo(
        () =>
            categories.map((category) => ({
                category,
                projects: projects
                    .filter(
                        (project: Project) =>
                            project.category === category &&
                            project.subCategory === "Others"
                    )
                    .map((project: Project) => ({
                        ...project,
                        title: project.name,
                        id: String(project.uid),
                        routeTo: project.nameSlug,
                    })),
            })),
        [categories, projects]
    );

    const firstCategory = timelineList[0].category;

    const firstCategoryFirstItem = useMemo(
        () => timelineList.find(({ id }) => id === firstCategory)?.items[0],
        [firstCategory, timelineList]
    );

    const [sliderIndex, setSliderIndex] = useState(0);

    const [state, setState] = useState({
        showStar: false,
        showNumber: true,
        projectNumberToShow: 0,
        currentProject: firstCategoryFirstItem,
        activeSectionId: firstCategory,
        activeItemId: firstCategoryFirstItem?.id ?? "1",
        routeTo: firstCategoryFirstItem?.routeTo ?? "",
    } as PageState);

    const bgColor = ((timelineList.find((section) => section.category === state.activeSectionId)?.items || []).at(0) || {}).bgColor;

    useEffect(() => {
        if (bgColor && backgroundColor !== bgColor) {
            dispatchbackgroundColor.replaceInState({
                backgroundColor: bgColor,
            })
        }
    }, [bgColor, backgroundColor, dispatchbackgroundColor]);

    const sliderItems: TimelineItem[] = useMemo(
        () =>
            timelineList.reduce((itemsList: TimelineItem[], currentValue) => {
                itemsList = [...itemsList, ...(currentValue.items || [])];

                return itemsList;
            }, []),
        [timelineList]
    );

    const currentCategoryOtherProjects = useMemo(
        () =>
            otherProjects.filter(
                (project) => project.category === state.activeSectionId
            ),
        [otherProjects, state.activeSectionId]
    );

    const projectsByCategory: PostItem[] = useMemo(
        () =>
            sliderItems.filter(
                (post) => post.category === state.activeSectionId
            ),
        [sliderItems, state.activeSectionId]
    );

    const onNavigate = useNavigation({
        to: state.routeTo,
    });

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

    const onOthersSelected = useCallback(() => {
        setIsSliderAnimating(false);
        setIsShowingOtherProjects(true);
        onSliderContentMouseEventChange(true);
    }, [
        setIsSliderAnimating,
        setIsShowingOtherProjects,
        onSliderContentMouseEventChange,
    ]);

    const setCurrentSlideState = useCallback(
        (currentItem: Item | SliderItem): void => {
            if (!currentItem || state.activeItemId === currentItem.id) {
                return;
            }

            if (currentItem.id.includes("others")) {
                onOthersSelected();
            } else {
                setIsShowingOtherProjects(false);
            }

            let projectNumberToShow: number;

            for (const category of timelineList) {
                const indexOfProject = category.items.findIndex(
                    (project) => project.id === currentItem.id
                );

                if (indexOfProject >= 0) {
                    projectNumberToShow = indexOfProject;
                    break;
                }
            }

            if (currentItem.bgColor) {
                dispatchbackgroundColor.replaceInState({
                    backgroundColor: currentItem.bgColor,
                });
            }

            const newSliderIndex = sliderItems.findIndex(
                (sliderItem: SliderItem) => sliderItem.id === currentItem.id
            );

            setSliderIndex(newSliderIndex);

            dispatch.showFooter(newSliderIndex === sliderItems.length - 1);

            setState((prevState) => ({
                ...prevState,
                routeTo: currentItem.routeTo,
                projectNumberToShow,
                activeSectionId: currentItem.category,
                activeItemId: currentItem.id,
                currentProject: currentItem,
            }));
        },
        [state, sliderItems, onOthersSelected, timelineList, setState, dispatch]
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

    const updateScroll = useDebouncedCallback((e: WheelEvent): void => {
        if (isSliderAnimating) {
            e.preventDefault();

            return;
        }

        const isUp = e.deltaY && e.deltaY < 0;
        const goTo = (newSlideDirection: number) => {
            const newSlideIndex = sliderIndex + newSlideDirection;

            if (newSlideIndex < 0 || newSlideIndex > sliderItems.length - 1) {
                return;
            }

            if (isShowingOtherProjects) {
                setIsShowingOtherProjects(false);
                window.scrollTo(0, 0);
            }

            dispatch.showFooter(newSlideIndex === sliderItems.length - 1);

            setSliderIndex(newSlideIndex);
        };

        if (isPageTop && isUp) {
            goTo(-1);
        } else if (isPageBottom && !isUp) {
            goTo(1);
        }
    }, 200);

    useEventListener(
        "wheel",
        (e) => {
            const isUserAtEndOfPage =
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight;

            isPageTop = window.scrollY <= 0;
            isPageBottom = isUserAtEndOfPage;

            updateScroll(e as WheelEvent);
        },
        (typeof document !== "undefined" &&
            (document.body as unknown)) as RefObject<HTMLDivElement>,
        { passive: false }
    );

    return (
        <Fragment>
            <MotionCursor />

            <MainContainer topPadding={true}>
                <ContentContainer>
                    {!hasSmallWindowWidth ? (
                        <SlideWrapper
                            isShowingOtherProjects={isShowingOtherProjects}
                        >
                            {!isShowingOtherProjects && (
                                <StyledNumber
                                    value={`${state.projectNumberToShow + 1}.`}
                                    viewBox="0 0 280 200"
                                    displayOnRight={true}
                                    style={{
                                        display: state.showNumber
                                            ? "block"
                                            : "none",
                                    }}
                                />
                            )}
                            {!isShowingOtherProjects && (
                                <StyledStar
                                    text={
                                        state?.currentProject
                                            ?.shortDescription || ""
                                    }
                                    color={
                                        state?.currentProject?.category &&
                                        state?.currentProject?.starColor
                                    }
                                    displayStar={state.showStar}
                                />
                            )}
                            <Slider
                                sliderItems={sliderItems}
                                onSliderTap={(e) => onNavigate(e)}
                                onSliderChange={setCurrentSlideState}
                                slideId={sliderIndex}
                                showSlideTitle={!isShowingOtherProjects}
                                isShowingOtherProjects={isShowingOtherProjects}
                                otherProjects={currentCategoryOtherProjects}
                                lastProjectNumber={projectsByCategory.length}
                                onSliderMouseEnter={
                                    onSliderContentMouseEventChange
                                }
                                onSliderMouseLeave={
                                    onSliderContentMouseEventChange
                                }
                                isAnimating={isSliderAnimating}
                                setIsAnimating={setIsSliderAnimating}
                            />
                        </SlideWrapper>
                    ) : null}

                    <TimelineWrapper>
                        <Timeline
                            style={{ height: "27.76rem" }}
                            onTimelineItemChange={setCurrentSlideState}
                            sections={timelineList}
                            activeSectionId={state.activeSectionId}
                            activeItemId={state.activeItemId}
                        />
                    </TimelineWrapper>
                    <Tabs
                        hideForDesktop={true}
                        onTabChange={onTabChange}
                        tabs={timelineList}
                        activeTabId={state.activeSectionId}
                    />
                    {hasSmallWindowWidth &&
                        projectsByCategory.map(
                            (post: PostItem, index: number) => (
                                <Post
                                    key={index}
                                    postNum={index + 1}
                                    post={post}
                                    onPostTap={(e, { routeTo }) =>
                                        onNavigate(e, routeTo as string)
                                    }
                                />
                            )
                        )}
                </ContentContainer>
            </MainContainer>
        </Fragment>
    );
});

export default Work;

export const Head = () => <Meta title="Work - Aga Chainska" />;

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
