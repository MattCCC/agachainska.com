import {
    Fragment,
    useCallback,
    memo,
    useState,
    RefObject,
    useMemo,
    useEffect,
} from "react";

import { GetStaticProps } from "next";
import tw, { css, styled } from "twin.macro";

import dynamic from "next/dynamic";

import { BigNumber } from "components/big-number";
import { MainContainer } from "components/main-container";
import { Meta } from "components/meta";
import { MotionCursor } from "components/motion-cursor";
import { Post, PostItem } from "components/post";
import { Btn, Controls, Slider, SliderItem } from "components/slider";
import { Star } from "components/star";
import { Tabs } from "components/tabs";
import { TimelineItem, TimelineSection } from "components/timeline";
import { useEventListener } from "hooks/use-event-listener";
import { useNavigation } from "hooks/use-navigation";
import { useWindowSize } from "hooks/use-window-size";
import { useStoreProp } from "store/index";
import { groupBy } from "utils/group-by";
import { Project, ProjectCategory } from "types/project";
import { fetchProjects } from "queries/fetch-projects";
import {
    ConfigurationPage,
    fetchSocialMediaData,
} from "queries/fetch-social-media-data";
import OtherProjects from "components/other-projects";

import NextIcon from "svg/down.svg";
import PrevIcon from "svg/up.svg";
import throttleWheelEvent from "utils/throttle-wheel-event";

interface PageState {
    sliderIndex: number;
    activeSectionId: string;
    activeItemId: string;
    routeTo: string;
    clickEvent: Event;
    showStar: boolean;
    projectNumberToShow: number;
    currentProject?: Project;
}

interface WorkSliderItem {
    name: string;
    id: string;
    routeTo: string;
    cover: string;
    category: string;
    shortDescription: string;
}

interface Props {
    projects: Project[];
    socialMediaData: ConfigurationPage;
}

interface SliderWrapperProps {
    isShowingOtherProjects: boolean;
}

const ContentContainer = styled.section(() => [
    tw`relative col-start-1 col-end-13 mb-20 lg:mb-0 lg:grid lg:items-center lg:col-start-2 lg:grid-cols-5 lg:gap-y-7 lg:grid-flow-col`,
    tw`lg:mt-[110px]`,
    tw`col-start-1 col-end-13 lg:col-start-2 lg:grid-cols-5 lg:gap-y-7 lg:grid-flow-col`,
]);

const SlideWrapper = styled.div(
    ({ isShowingOtherProjects }: SliderWrapperProps) => [
        tw`relative hidden col-span-5 col-start-1 col-end-5 lg:block`,
        isShowingOtherProjects && tw`h-full`,
        css`
            svg {
                ${tw`cursor-none`}
            }
        `,
    ]
);

const TimelineWrapper = styled.aside(() => [
    tw`hidden col-start-5 row-span-5 row-start-1 row-end-5 lg:block self-baseline mt-[50px]`,
]);

const StyledNumber = styled(BigNumber)(() => [
    tw`absolute right-0 z-20 font-bold select-none font-fbold`,
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

const PrevIconStyled = styled(PrevIcon)(() => [
    tw`inline-block mr-4 text-center`,
]);

const NextIconStyled = styled(NextIcon)(() => [
    tw`inline-block mr-4 text-center`,
]);

let isPageTop = false;
let isPageBottom = false;

const TimelineNoSSR = dynamic(() => import("../components/timeline"), {
    ssr: false,
});

const bodyNode = (typeof document !== "undefined" &&
    (document.body as unknown)) as RefObject<HTMLDivElement>;

const Work = memo(({ projects, socialMediaData }: Props) => {
    const windowSize = useWindowSize();
    const [hasSmallWindowWidth, setWindowWidth] = useState(false);

    useEffect(() => {
        setWindowWidth(windowSize.width < 1024);
    }, [windowSize]);

    const [, dispatchSocialMediaData] = useStoreProp("socialMediaData");

    useEffect(() => {
        dispatchSocialMediaData.setSocialMediaData(socialMediaData.socialMedia);
    }, [dispatchSocialMediaData, socialMediaData.socialMedia]);

    const [isShowingOtherProjects, setIsShowingOtherProjects] = useState(false);
    const [isSliderAnimating, setIsSliderAnimating] = useState(false);
    const [, dispatch] = useStoreProp("showMotionGrid");
    const [, dispatchBgColor] = useStoreProp("workPageBackgroundColor");

    const categories = useMemo(
        () => Object.keys(groupBy(projects, "category")) as ProjectCategory[],
        [projects]
    );

    const covers = useMemo(
        () => Object.keys(groupBy(projects, "cover")),
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

                const timelineData: TimelineSection = {
                    title: category,
                    id: category,
                    items: projects
                        .filter(
                            (project) =>
                                project.category === category &&
                                project.subCategory !== "Others"
                        )
                        .map((project) => ({
                            title: project.name,
                            id: project._sys.filename,
                        })),
                };

                if (
                    hasOtherProjects &&
                    !hasSmallWindowWidth &&
                    timelineData.items
                ) {
                    timelineData.items.push({
                        id: `others${category}`,
                        title: "Others",
                    });
                }

                return timelineData;
            }),
        [categories, hasSmallWindowWidth, projects]
    );

    const firstCategory = timelineList[0]?.id;

    const firstCategoryFirstItem = useMemo(() => {
        const section = timelineList.find(({ id }) => id === firstCategory);

        return section?.items ? section?.items[0] : null;
    }, [firstCategory, timelineList]);

    const currentProject = useMemo(() => {
        if (!firstCategoryFirstItem?.id) {
            return null;
        }

        const project = projects.find(
            ({ _sys }) => _sys.filename === firstCategoryFirstItem.id
        );

        return project;
    }, [firstCategoryFirstItem, projects]);

    const [sliderIndex, setSliderIndex] = useState(0);

    const [state, setState] = useState({
        currentProject,
        showStar: false,
        projectNumberToShow: 0,
        activeSectionId: firstCategory,
        activeItemId: firstCategoryFirstItem?.id ?? "1",
        routeTo: currentProject?._sys.filename ?? "",
    } as PageState);

    useEffect(() => {
        const timer = setTimeout(() => {
            const project = projects.find(
                ({ _sys }) => _sys.filename === state.activeItemId
            );

            dispatchBgColor.setWorkPageBackgroundColor(
                String(project?.workPageColor || "#FFF")
            );
        }, 0);

        return () => {
            clearTimeout(timer);
        };
    }, [dispatchBgColor, projects, state.activeItemId]);

    const sliderItems: WorkSliderItem[] = useMemo(
        () =>
            timelineList
                .reduce((itemsList: TimelineItem[], currentValue) => {
                    itemsList = [...itemsList, ...(currentValue.items || [])];

                    return itemsList;
                }, [])
                .map((item) => {
                    const project = projects.find(
                        ({ _sys }) => _sys.filename === item.id
                    );

                    if (!project) {
                        return {
                            id: item.id,
                            name: item.title,
                            routeTo: "",
                            cover: "",
                            category: "",
                            shortDescription: "",
                        };
                    }

                    return {
                        id: project._sys.filename,
                        routeTo: project._sys.filename,
                        name: project.name,
                        cover: project.cover,
                        category: project.category,
                        shortDescription: project.shortDescription,
                    };
                }),
        [projects, timelineList]
    );

    const numItems = useMemo(() => sliderItems.length, [sliderItems]);

    const otherProjects = useMemo(
        () =>
            categories.map((category) => ({
                category,
                projects: projects
                    .filter(
                        (project) =>
                            project.category === category &&
                            project.subCategory === "Others"
                    )
                    .map((project) => ({
                        ...project,
                        title: project.name,
                        id: String(project._sys.filename),
                        routeTo: project._sys.filename,
                    })),
            })),
        [categories, projects]
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
        to: `projects/${state.routeTo}`,
    });

    // Cursor CTA
    const onSliderContentMouseEventChange = useCallback(
        (mouseDidLeave = false) => {
            dispatch.showMotionCursor(!mouseDidLeave, {
                text: "explore",
                to: state.routeTo,
                overlap: false,
            });

            setState((prevState) => ({
                ...prevState,
                showStar: !mouseDidLeave,
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
        (currentItem?: TimelineItem | SliderItem): void => {
            if (!currentItem || state.activeItemId === currentItem.id) {
                return;
            }

            const isOthers = currentItem.id.startsWith("others");
            const activeItemId = currentItem.id;

            if (isOthers) {
                onOthersSelected();
            } else {
                setIsShowingOtherProjects(false);
            }

            let projectNumberToShow: number;

            for (const category of timelineList) {
                const indexOfProject = category.items?.findIndex(
                    ({ id }) => id === activeItemId
                );

                if (typeof indexOfProject === "number" && indexOfProject >= 0) {
                    projectNumberToShow = indexOfProject;
                    break;
                }
            }

            const newSliderIndex = sliderItems.findIndex(
                (sliderItem: SliderItem) => sliderItem.id === activeItemId
            );

            setSliderIndex(newSliderIndex);

            dispatch.showFooter(newSliderIndex === sliderItems.length - 1);

            const project = isOthers
                ? projects.find(
                      ({ category, subCategory }) =>
                          category === activeItemId.substring(6) &&
                          subCategory !== "Others"
                  )
                : projects.find(({ _sys }) => _sys.filename === activeItemId);

            setState((prevState) => ({
                ...prevState,
                projectNumberToShow,
                activeItemId,
                routeTo: project?._sys.filename || "",
                activeSectionId: project?.category || "",
                currentProject: project,
            }));
        },
        [
            state.activeItemId,
            sliderItems,
            dispatch,
            projects,
            onOthersSelected,
            timelineList,
        ]
    );

    const onTabChange = useCallback(
        (currentTab: TimelineSection): void => {
            if (state.activeSectionId === currentTab.id) {
                return;
            }

            setState((prevState) => ({
                ...prevState,
                activeSectionId: currentTab.id,
                activeItemId: currentTab.id,
            }));
        },
        [state]
    );

    const goTo = (newSlideDirection: number) => {
        if (isSliderAnimating) {
            return;
        }

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

    const updateScroll = (e: WheelEvent): void => {
        if (isSliderAnimating) {
            return;
        }

        const isUserAtEndOfPage =
            window.innerHeight + window.scrollY >= document.body.offsetHeight;

        isPageTop = window.scrollY <= 0;
        isPageBottom = isUserAtEndOfPage;

        const isUp = e.deltaY && e.deltaY < 0;

        if (isPageTop && isUp) {
            goTo(-1);
        } else if (isPageBottom && !isUp) {
            goTo(1);
        }
    };

    useEventListener("wheel", throttleWheelEvent(updateScroll, 200), bodyNode, {
        passive: true,
    });

    return (
        <Fragment>
            <Meta title="Work · Aga Chainska">
                {covers.map((cover) => (
                    <link key={cover} rel="preload" href={cover} as="image" />
                ))}
            </Meta>

            <MotionCursor />

            <MainContainer topPadding={true}>
                <ContentContainer>
                    {!hasSmallWindowWidth ? (
                        <>
                            <SlideWrapper
                                isShowingOtherProjects={isShowingOtherProjects}
                            >
                                {!isShowingOtherProjects ? (
                                    <Slider
                                        sliderItems={sliderItems}
                                        onSliderTap={(e) => onNavigate(e)}
                                        onSliderChange={setCurrentSlideState}
                                        slideId={sliderIndex}
                                        showSlideTitle={!isShowingOtherProjects}
                                        onSliderMouseEnter={
                                            onSliderContentMouseEventChange
                                        }
                                        onSliderMouseLeave={
                                            onSliderContentMouseEventChange
                                        }
                                        setIsAnimating={setIsSliderAnimating}
                                    >
                                        <>
                                            <StyledNumber
                                                id={`${
                                                    state.projectNumberToShow +
                                                    1
                                                }`}
                                                value={`${
                                                    state.projectNumberToShow +
                                                    1
                                                }.`}
                                                viewBox="0 0 280 200"
                                                displayOnRight={true}
                                                style={{
                                                    display: !state.showStar
                                                        ? "block"
                                                        : "none",
                                                }}
                                            />
                                            <StyledStar
                                                text={
                                                    state?.currentProject
                                                        ?.shortDescription || ""
                                                }
                                                color={
                                                    state?.currentProject
                                                        ?.category &&
                                                    state?.currentProject
                                                        ?.starColor
                                                }
                                                displayStar={state.showStar}
                                            />
                                        </>
                                    </Slider>
                                ) : (
                                    <>
                                        <OtherProjects
                                            animate={true}
                                            otherProjects={
                                                currentCategoryOtherProjects
                                            }
                                            lastProjectNumber={
                                                projectsByCategory.length + 1
                                            }
                                        />

                                        <Controls>
                                            {sliderIndex < numItems - 1 && (
                                                <Btn
                                                    onClick={(): void =>
                                                        goTo(1)
                                                    }
                                                >
                                                    <NextIconStyled /> Next
                                                </Btn>
                                            )}
                                            {sliderIndex > 0 && (
                                                <Btn onClick={() => goTo(-1)}>
                                                    <PrevIconStyled /> Previous
                                                </Btn>
                                            )}
                                        </Controls>
                                    </>
                                )}
                            </SlideWrapper>

                            <TimelineWrapper>
                                <TimelineNoSSR
                                    style={{ height: "27.76rem" }}
                                    onTimelineItemChange={setCurrentSlideState}
                                    sections={timelineList}
                                    activeSectionId={state.activeSectionId}
                                    activeItemId={state.activeItemId}
                                />
                            </TimelineWrapper>
                        </>
                    ) : (
                        <>
                            <Tabs
                                hideForDesktop={true}
                                onTabChange={onTabChange}
                                tabs={timelineList}
                                activeTabId={state.activeSectionId}
                            />

                            {projectsByCategory.map(
                                (post: PostItem, index: number) => (
                                    <Post
                                        key={index}
                                        postNum={index + 1}
                                        post={post}
                                        onPostTap={(e) =>
                                            onNavigate(
                                                e,
                                                `projects/${post["routeTo"]}`
                                            )
                                        }
                                    />
                                )
                            )}
                        </>
                    )}
                </ContentContainer>
            </MainContainer>
        </Fragment>
    );
});

export default Work;

export const getStaticProps: GetStaticProps = async ({ locale = "en" }) => {
    const projects = await fetchProjects({ locale });

    if (!projects) {
        return {
            notFound: true,
        };
    }

    const socialMediaData = await fetchSocialMediaData({ locale });

    if (!socialMediaData) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            projects,
            socialMediaData,
        },
    };
};
