import { Fragment } from "react";

import { graphql, PageProps } from "gatsby";
import { useInViewEffect } from "react-hook-inview";

import { FullPageContent } from "@components/full-page-content";
import { H2 } from "@components/h2";
import { H3 } from "@components/h3";
import { Link } from "@components/link";
import { GridRow } from "@components/main-container";
import { MotionCursor } from "@components/motion-cursor";
import { ParallaxBackground } from "@components/parallax-background";
import { Quote } from "@components/quote";
import { Tabs } from "@components/tabs";
import { Timeline } from "@components/timeline";
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
import { ProjectsByCategory, useProjectsByCategory } from "@hooks/use-projects-by-category";
import { useTimelineViewport } from "@hooks/use-timeline-viewport";

interface Props extends PageProps {
    data: {
        project: Project;
        projects: {
            nodes: Project[];
        };
    };
}

const loadChallengeSection = (
    challenge: Project["challenge"],
    refChallenge: (node: Element | null) => void,
    elements: ProjectSection["elements"]
) => (
    <ArticleSection id="challenge" ref={refChallenge}>
        <H2>Challenge</H2>
        <ContentContainer>
            {elements.map(({element, description}) => {
                switch (element) {
                    case "overview":
                        return (
                            <Fragment>
                                <H3>Overview</H3>
                                <Paragraph>{description}</Paragraph>
                            </ Fragment>
                        );
                    case "project-goals":
                        return (
                            <Fragment>
                                <H3>Project goals</H3>
                                <Paragraph>{description}</Paragraph>
                            </Fragment>
                        );
                    case "audience":
                        return (
                            <Fragment>
                                <H3>Audience</H3>
                                <Paragraph>{description}</Paragraph>
                            </Fragment>
                        );
                }

                return "";
            })}
        </ContentContainer>
    </ArticleSection>
);

const loadApproachSection = (
    refApproach: (node: Element | null) => void,
    elements: ProjectSection["elements"]
) => (
    <ArticleSection id="approach" ref={refApproach}>
        <H2>Approach</H2>
        <ContentContainer>
            {elements.map(({element, description, image, imageOne, imageTwo}) => {
                    switch (element) {
                        case "brand-elements":
                            return (
                                <Fragment>
                                    <H3>Brand elements</H3>
                                    <Paragraph>{description}</Paragraph>
                                </ Fragment>
                            );
                        case "full-size-image":
                            return (
                                <Fragment>
                                    <FullSizeImageWrapper>
                                        <ParallaxBackground
                                            bgImgUrl={`${image}`}
                                            contain={true}
                                            scaleOnHover={true}
                                        />
                                    </FullSizeImageWrapper>
                                </Fragment>
                            );
                        case "two-images":
                            return (
                                <Fragment>
                                    <TwoImagesWrapper>
                                        <ParallaxBackground
                                            bgImgUrl={`${imageOne}`}
                                            contain={true}
                                            scaleOnHover={true}
                                        />
                                        <ParallaxBackground
                                            bgImgUrl={`${imageTwo}`}
                                            contain={true}
                                            scaleOnHover={true}
                                        />
                                    </TwoImagesWrapper>
                                </Fragment>
                            );
                    }

                    return "";
            })}
        </ContentContainer>

        {elements.map(({element, quote, image}) => {
            switch (element) {
                case "full-page-image":
                    return (
                        <FullPageContent widthPct={100}>
                            <ParallaxBackground
                                bgImgUrl={`${image}`}
                            />
                        </FullPageContent>
                    );
                case "slider":
                    return (
                        <GallerySlider gap={133} />
                    );
                case "quote":
                    return (
                        <ContentContainer variant="full">
                            <Quote>{quote}</Quote>
                        </ContentContainer>
                    );
            }

            return "";
        })}

    </ArticleSection>
);

const loadResultsSection = (
    refResults: (node: Element | null) => void,
    elements: ProjectSection["elements"],
    refStats: (node: Element | null) => void,
    animateStats: boolean
) => (
    <ArticleSection>
        <ContentContainer
            id="results"
            ref={refResults}
            variant="full"
        >
            {elements.map(({screens, iterations, prototypes}) => (
                <Fragment>
                    <TableStats ref={refStats}>
                        <CellTitle>
                            <StyledNumber
                                value={screens}
                                animate={animateStats}
                            />
                        </CellTitle>
                        <StatsCaption className="space">
                            Screens
                        </StatsCaption>
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

const loadCreditsSection = (
    elements: ProjectSection["elements"]
) => (
    <ArticleSection id="credits">
        <H2>Credits</H2>
        <ContentContainer variant="full">
            <TableCredits>
                {elements.map(({concept,
                                conceptDesc,
                                design,
                                designDesc,
                                projectManagement,
                                projectManagementDesc}) => (
                    <Fragment>
                        <CellTitle>{concept}</CellTitle>
                        <div>{conceptDesc}</div>
                        <CellTitle>{design}</CellTitle>
                        <div>{designDesc}</div>
                        <CellTitle>{projectManagement}</CellTitle>
                        <div>{projectManagementDesc}</div>
                    </Fragment>
                ))}
            </TableCredits>
        </ContentContainer>
    </ArticleSection>
);

const loadOtherProjectsSection = (
   elements: ProjectSection["elements"],
   projectsByCategory: ProjectsByCategory
) => (
    <ArticleSection id="another-projects">
        <H2>Other {elements[0].category} Projects</H2>
        <ContentContainer variant="full">
            <OtherProjects
                projectsByCategory={projectsByCategory}
            />
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
        challenge,
        approach,
        stats,
        credits,
        sections,
    } = data.project;

    const projects = data.projects.nodes;
    const [projectsByCategory] = useProjectsByCategory({ category, projects });

    const [navigation] = usePagination({ projectsByCategory, uid });
    const [refStats, animateStats] = useIncrementStats();

    const [
        activeItemId,
        intersection,
        options,
        onTimelineItemChange,
    ] = useTimelineViewport();
    const refChallenge = useInViewEffect(intersection, options);
    const refApproach = useInViewEffect(intersection, options);
    const refResults = useInViewEffect(intersection, {
        ...options,
        rootMargin: "100% 0px 0px 0px",
    });

    return (
        <Fragment>
            <MotionCursor />

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
                        activeSectionId={designProcessTimeline[0].id}
                        onTimelineItemChange={onTimelineItemChange}
                        sections={designProcessTimeline}
                    />
                </TimelineWrapper>

                <Tabs
                    hideForDesktop={true}
                    onTabChange={onTimelineItemChange}
                    tabs={designProcessTimeline[0].items}
                    activeTabId={activeItemId}
                />

                {sections.map(({ section, elements }) => {
                    switch (section) {
                        case "challenge":
                            return loadChallengeSection(
                                challenge,
                                refChallenge,
                                elements
                            );

                        case "approach":
                            return loadApproachSection(
                                refApproach,
                                elements
                            );

                        case "results":
                            return loadResultsSection(
                                refResults,
                                elements,
                                refStats,
                                animateStats
                            );

                        case "credits":
                            return loadCreditsSection(
                                elements,
                            );

                        case "other-projects":
                            return loadOtherProjectsSection(
                                elements,
                                projectsByCategory
                            );
                    }

                    return "";
                })}
            </Article>
        </Fragment>
    );
}

export const query = graphql`
    query($id: String!) {
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
