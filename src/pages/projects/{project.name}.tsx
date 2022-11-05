import { Fragment } from "react";

import { graphql, PageProps } from "gatsby";
import type { HeadProps } from "gatsby";
import { useInViewEffect } from "react-hook-inview";

import { FullPageContent } from "@components/full-page-content";
import { H2 } from "@components/h2";
import { H3 } from "@components/h3";
import { Link } from "@components/link";
import { GridRow } from "@components/main-container";
import { Meta } from "@components/meta";
import { MobileDeviceCarousel } from "@components/mobile-device-carousel";
import { MobileDeviceMockup } from "@components/mobile-device-mockup";
import { MotionCursor } from "@components/motion-cursor";
import { ParallaxBackground } from "@components/parallax-background";
import { Quote } from "@components/quote";
import { Tabs } from "@components/tabs";
import { Timeline } from "@components/timeline";
import ViewOnDeskStar from "@components/view-on-desktop-star";
import { designProcessTimeline } from "@config/page-timlines";
import { GallerySlider } from "@domain/single-project/gallery-slider";
import { OtherProjects } from "@domain/single-project/other-projects";
import {
    MainSection,
    Button,
    CellTitle,
    ContentContainer,
    Controls,
    NextIconStyled,
    PrevIconStyled,
    TableProject,
    Article,
    TimelineWrapper,
    ArticleSection,
    Paragraph,
    FullSizeImageWrapper,
    TwoImagesWrapper,
    HeroWrapper,
    TableStats,
    StyledNumber,
    MainTitleWrapper,
    StatsCaption,
    TableCredits,
    MainTitle,
} from "@domain/single-project/styled";
import { useIncrementStats } from "@domain/single-project/use-increment-stats";
import { usePagination } from "@domain/single-project/use-pagination";
import {
    ProjectsByCategory,
    useProjectsByCategory,
} from "@hooks/use-projects-by-category";
import { useTimelineViewport } from "@hooks/use-timeline-viewport";
import { useWindowSize } from "@hooks/use-window-size";

interface Props extends PageProps {
    data: {
        project: Project;
        projects: {
            nodes: Project[];
        };
    };
}

const sectionLoader = (
    elements: ProjectSection["elements"],
    gallerySliderElementsGap: number = 0
) => {
    return elements.map(
        (
            { element, description = "", image = "", images = [], quote = "" },
            index
        ) => {
            switch (element) {
                case "overview":
                    return (
                        <ContentContainer key={index}>
                            <H3>Overview</H3>
                            <Paragraph>{description}</Paragraph>
                        </ContentContainer>
                    );

                case "project-goals":
                    return (
                        <ContentContainer key={index}>
                            <H3>Project goals</H3>
                            <Paragraph>{description}</Paragraph>
                        </ContentContainer>
                    );

                case "audience":
                    return (
                        <ContentContainer key={index}>
                            <H3>Audience</H3>
                            <Paragraph>{description}</Paragraph>
                        </ContentContainer>
                    );

                case "brand-elements":
                    return (
                        <ContentContainer key={index}>
                            <H3>Brand elements</H3>
                            <Paragraph>{description}</Paragraph>
                        </ContentContainer>
                    );

                case "full-size-image":
                    return (
                        <ContentContainer key={index}>
                            <FullSizeImageWrapper>
                                <ParallaxBackground
                                    bgImgUrl={`${image}`}
                                    contain={true}
                                    scaleOnHover={true}
                                />
                            </FullSizeImageWrapper>
                        </ContentContainer>
                    );

                case "two-images":
                    return (
                        <ContentContainer key={index}>
                            <TwoImagesWrapper>
                                {(images as unknown as { image: string }[]).map(
                                    function ({ image }) {
                                        return (
                                            <ParallaxBackground
                                                bgImgUrl={`${image}`}
                                                contain={true}
                                                scaleOnHover={true}
                                            />
                                        );
                                    }
                                )}
                            </TwoImagesWrapper>
                        </ContentContainer>
                    );

                case "full-page-image":
                    return (
                        <Fragment key={index}>
                            <FullPageContent widthPct={100}>
                                <ParallaxBackground bgImgUrl={`${image}`} />
                            </FullPageContent>
                        </Fragment>
                    );

                case "slider":
                    return (
                        <Fragment key={index}>
                            <GallerySlider gap={gallerySliderElementsGap} />
                        </Fragment>
                    );

                case "quote":
                    return (
                        <Fragment key={index}>
                            <ContentContainer variant="full">
                                <Quote>{quote}</Quote>
                            </ContentContainer>
                        </Fragment>
                    );

                case "device":
                    return (
                        <Fragment key={index}>
                            <ContentContainer variant="full">
                                <MobileDeviceMockup
                                    prototypeSrc={
                                        "https://www.figma.com/embed?embed_host=share&amp;url=https%3A%2F%2Fwww.figma.com%2Fproto%2FQaKvvMvwwFov4qwUMN79N1%2FPayMe%3Fnode-id%3D4%253A1113%26scaling%3Dscale-down-width%26page-id%3D2%253A475%26starting-point-node-id%3D4%253A600%26show-proto-sidebar%3D1&amp;hide-ui=1"
                                    }
                                />
                            </ContentContainer>
                        </Fragment>
                    );

                case "devices":
                    return (
                        <Fragment key={index}>
                            <ContentContainer variant="full">
                                <MobileDeviceCarousel />
                            </ContentContainer>
                        </Fragment>
                    );

                default:
                    return "";
            }
        }
    );
};

const loadChallengeSection = (
    refChallenge: (node: Element | null) => void,
    elements: ProjectSection["elements"]
) => (
    <ArticleSection key="challenge" id="challenge" ref={refChallenge}>
        <H2>Challenge</H2>
        {sectionLoader(elements)}
    </ArticleSection>
);

const loadApproachSection = (
    refApproach: (node: Element | null) => void,
    elements: ProjectSection["elements"],
    gallerySliderElementsGap: number
) => (
    <ArticleSection key="approach" id="approach" ref={refApproach}>
        <H2>Approach</H2>
        {sectionLoader(elements, gallerySliderElementsGap)}
    </ArticleSection>
);

const loadResultsSection = (
    refResults: (node: Element | null) => void,
    elements: ProjectSection["elements"],
    refStats: (node: Element | null) => void,
    animateStats: boolean
) => (
    <ArticleSection key="results">
        <ContentContainer id="results" ref={refResults} variant="full">
            {elements.map(({ screens, iterations, prototypes }, index) => (
                <Fragment key={index}>
                    <TableStats ref={refStats}>
                        <CellTitle>
                            <StyledNumber
                                value={screens}
                                animate={animateStats}
                            />
                        </CellTitle>
                        <StatsCaption className="space">Screens</StatsCaption>
                        <CellTitle>
                            <StyledNumber
                                value={screens}
                                animate={animateStats}
                            />
                        </CellTitle>
                        <StatsCaption>Screens</StatsCaption>

                        <CellTitle>
                            <StyledNumber
                                value={iterations}
                                animate={animateStats}
                            />
                        </CellTitle>
                        <StatsCaption className="space">
                            Iterations
                        </StatsCaption>
                        <CellTitle>
                            <StyledNumber
                                value={iterations}
                                animate={animateStats}
                            />
                        </CellTitle>
                        <StatsCaption>Iterations</StatsCaption>

                        <CellTitle>
                            <StyledNumber
                                value={prototypes}
                                animate={animateStats}
                            />
                        </CellTitle>
                        <StatsCaption className="space">
                            Prototypes
                        </StatsCaption>
                    </TableStats>
                </Fragment>
            ))}
        </ContentContainer>
    </ArticleSection>
);

const loadCreditsSection = (elements: ProjectSection["elements"]) => (
    <ArticleSection key="credits" id="credits">
        <H2>Credits</H2>
        <ContentContainer variant="full">
            <TableCredits>
                {elements.map(
                    (
                        {
                            concept,
                            conceptDesc,
                            design,
                            designDesc,
                            projectManagement,
                            projectManagementDesc,
                        },
                        index
                    ) => (
                        <Fragment key={index}>
                            <CellTitle>{concept}</CellTitle>
                            <div>{conceptDesc}</div>
                            <CellTitle>{design}</CellTitle>
                            <div>{designDesc}</div>
                            <CellTitle>{projectManagement}</CellTitle>
                            <div>{projectManagementDesc}</div>
                        </Fragment>
                    )
                )}
            </TableCredits>
        </ContentContainer>
    </ArticleSection>
);

const loadOtherProjectsSection = (
    elements: ProjectSection["elements"],
    projectsByCategory: ProjectsByCategory
) => (
    <ArticleSection key="other-projects" id="another-projects">
        <H2>Other {elements[0].category} Projects</H2>
        <ContentContainer variant="full">
            <OtherProjects projectsByCategory={projectsByCategory} />
        </ContentContainer>
    </ArticleSection>
);

export default function Project({ data }: Props): JSX.Element {
    const {
        uid,
        name,
        cover,
        client,
        category,
        agency,
        timeframe,
        roleInProject,
        sections,
    } = data.project;

    const projects = data.projects.nodes;
    const [projectsByCategory] = useProjectsByCategory({ category, projects });

    const windowSize = useWindowSize();
    const hasSmallWindowWidth = windowSize.width < 1024;
    const gallerySliderElementsGap = hasSmallWindowWidth ? 30 : 133;

    const [navigation] = usePagination({ projectsByCategory, uid });
    const [refStats, animateStats] = useIncrementStats();

    const [activeItemId, intersection, options, onTimelineItemChange] =
        useTimelineViewport();

    const allowedTimelineSections = ["challenge", "approach", "results"];
    const timelineWithSections = [
        {
            ...designProcessTimeline[0],
            items: sections
                .filter(({ section }) =>
                    allowedTimelineSections.includes(section)
                )

                .map(({ section }) => {
                    const lowerCasedSectionName = section.toLowerCase();

                    return {
                        id: lowerCasedSectionName,
                        title: lowerCasedSectionName,
                    };
                }),
        },
    ];

    const refChallenge = useInViewEffect(intersection, {
        ...options,
        rootMargin: "0px 0px 100% 0px",
    });
    const refApproach = useInViewEffect(intersection, {
        ...options,
        rootMargin: "0px 0px -200px 0px",
    });
    const refResults = useInViewEffect(intersection, {
        ...options,
        rootMargin: "200% 0px 0px 0px",
    });

    return (
        <Fragment>
            <MotionCursor />

            <ViewOnDeskStar />

            <MainSection topPadding={true}>
                <HeroWrapper>
                    <MainTitleWrapper>
                        <MainTitle
                            percentage={62}
                            baseFontSize={120}
                            smBaseFontSize={70}
                            data-text={name}
                        >
                            {name}
                        </MainTitle>
                    </MainTitleWrapper>
                    <ParallaxBackground bgImgUrl={cover} />
                </HeroWrapper>
                <GridRow start={2} end={12}>
                    {(navigation.hasPreviousButton ||
                        navigation.hasNextButton) && (
                        <Controls>
                            {navigation.hasPreviousButton && (
                                <Link to={navigation.previousTo}>
                                    <Button>
                                        <PrevIconStyled /> Previous
                                    </Button>
                                </Link>
                            )}
                            {navigation.hasNextButton && (
                                <Link to={navigation.nextTo}>
                                    <Button>
                                        Next <NextIconStyled />
                                    </Button>
                                </Link>
                            )}
                        </Controls>
                    )}
                    <TableProject>
                        <CellTitle>Client:</CellTitle>
                        <div>{client}</div>
                        <CellTitle>Project timeframe & duration:</CellTitle>
                        <div>{timeframe}</div>
                        <CellTitle>Agency:</CellTitle>
                        <div>{agency}</div>
                        <CellTitle>My role in the project:</CellTitle>
                        <div>{roleInProject}</div>
                    </TableProject>
                </GridRow>
            </MainSection>

            <Article>
                <TimelineWrapper>
                    <Timeline
                        style={{ height: "254px" }}
                        activeItemId={activeItemId}
                        activeSectionId={timelineWithSections[0].id}
                        onTimelineItemChange={onTimelineItemChange}
                        sections={timelineWithSections}
                    />
                </TimelineWrapper>

                <Tabs
                    hideForDesktop={true}
                    onTabChange={onTimelineItemChange}
                    tabs={timelineWithSections[0].items}
                    activeTabId={activeItemId}
                />

                {sections.map(({ section, elements }) => {
                    switch (section) {
                        case "challenge":
                            return loadChallengeSection(refChallenge, elements);

                        case "approach":
                            return loadApproachSection(
                                refApproach,
                                elements,
                                gallerySliderElementsGap
                            );

                        case "results":
                            return loadResultsSection(
                                refResults,
                                elements,
                                refStats,
                                animateStats
                            );

                        case "credits":
                            return loadCreditsSection(elements);

                        case "other-projects":
                        default:
                            return loadOtherProjectsSection(
                                elements,
                                projectsByCategory
                            );
                    }
                })}
            </Article>
        </Fragment>
    );
}

export const query = graphql`
    query ($id: String!) {
        project(id: { eq: $id }) {
            ...ProjectFields
        }
        projects: allProject {
            nodes {
                ...ProjectFields
                nameSlug: gatsbyPath(filePath: "/projects/{project.name}")
            }
        }
    }
`;

export const Head = (props: HeadProps<{}, { name: string }>) => (
    <Meta title={`${props.pageContext?.name || "Project"} - Aga Chainska`} />
);
