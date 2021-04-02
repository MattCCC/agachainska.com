import { Fragment, useCallback, useEffect, useMemo, useState } from "react";

import { graphql, PageProps } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { useInViewEffect } from "react-hook-inview";
import { Parallax } from "react-scroll-parallax";

import { FullPageImage } from "@components/full-page-image";
import { H2 } from "@components/h2";
import { H3 } from "@components/h3";
import { Header } from "@components/header";
import { Link } from "@components/link";
import { MotionCursor } from "@components/motion-cursor";
import { Quote } from "@components/quote";
import { Timeline } from "@components/timeline";
import { designProcessTimeline } from "@config/page-timlines";
import { OtherProjects } from "@domain/single-project/other-projects";
import {
    MainSection,
    Button,
    CellTitle,
    MainContainer,
    ContentContainer,
    Controls,
    HeroImage,
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
import { useProjectsByCategory } from "@hooks/use-projects-by-category";
import { useStoreProp } from "@store/index";
import { thresholdArray } from "@utils/threshold-array";

interface Navigation {
    hasPreviousButton: boolean;
    hasNextButton: boolean;
    previousTo: string;
    nextTo: string;
}

interface Props extends PageProps {
    data: {
        project: Project;
        projects: {
            nodes: Project[];
        };
    };
}

const options = {
    rootMargin: "0px",
    threshold: thresholdArray(20),
};

export default function Project({ data }: Props): JSX.Element {
    const [, dispatch] = useStoreProp("showMotionGrid");
    const [activeItemId, setActiveItemId] = useState(
        (window.location.hash || "challenge").replace("#", "")
    );

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
    } = data.project;

    const projects = data.projects.nodes;
    const [projectsByCategory] = useProjectsByCategory({ category, projects });

    const [navigation, setNavigation] = useState({
        hasPreviousButton: false,
        hasNextButton: false,
    } as Navigation);

    useEffect(() => {
        dispatch.showMotionGrid(false);
        dispatch.showWavePattern(false);
    }, [dispatch]);

    const onPaginate = useCallback(
        (num: number): string | boolean => {
            const projectsList = projectsByCategory.filteredProjects;

            if (projectsList.length === 0) {
                return false;
            }

            const projectIndex = projectsList.findIndex(
                (currentProject) => currentProject.uid === uid
            );

            if (projectIndex <= -1 || !projectsList[projectIndex + num]) {
                return false;
            }

            const { nameSlug } = projectsList[projectIndex + num];

            return nameSlug;
        },
        [projectsByCategory, uid]
    );

    useEffect(() => {
        const projectsList = projectsByCategory.filteredProjects;

        if (projectsList.length === 0) {
            return;
        }

        const previousTo = onPaginate(-1);
        const nextTo = onPaginate(1);

        setNavigation({
            previousTo,
            nextTo,
            hasPreviousButton: projectsList[0]?.uid !== uid,
            hasNextButton: projectsList[projectsList.length - 1]?.uid !== uid,
        } as Navigation);
    }, [onPaginate, projectsByCategory, uid]);

    const pctInViewport = useMemo(() => ({} as Record<string, number>), []);

    const intersection: IntersectionObserverCallback = useCallback(
        ([{ intersectionRatio, target }]): void => {
            pctInViewport[target.id] = intersectionRatio;

            const selectedId = Object.keys(
                pctInViewport
            ).reduceRight((prev, curr) =>
                pctInViewport[prev] > pctInViewport[curr] ? prev : curr
            );

            setActiveItemId(selectedId);
        },
        [pctInViewport]
    );

    const refChallenge = useInViewEffect(intersection, options);
    const refApproach = useInViewEffect(intersection, options);
    const refResults = useInViewEffect(intersection, options);

    const onTimelineItemChange = useCallback(({ id }): void => {
        window.location.hash = "#" + id;
    }, []);

    return (
        <Fragment>
            <Header />
            <MotionCursor />

            <MainSection>
                <MainContainer>
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
                        <HeroImage bgImgUrl={cover} />
                    </HeroWrapper>
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
                </MainContainer>
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

                <ArticleSection id="challenge" ref={refChallenge}>
                    <ContentContainer className="sm">
                        <H2>Challenge</H2>
                        <H3>Overview</H3>
                        <Paragraph>{challenge.overview}</Paragraph>
                        <H3>Project goals</H3>
                        <Paragraph>{challenge.projectGoals}</Paragraph>
                        <H3>Audience</H3>
                        <Paragraph>{challenge.audience}</Paragraph>
                    </ContentContainer>
                </ArticleSection>

                <ArticleSection id="approach" ref={refApproach}>
                    <ContentContainer className="sm">
                        <H2>Approach</H2>
                        <H3>Brand elements</H3>
                        <Paragraph>{approach.brandElements}</Paragraph>
                        <FullSizeImageWrapper>
                            <Parallax y={[-50, 50]}>
                                <StaticImage
                                    src="../../img/placeholder-full.png"
                                    alt="Placeholder"
                                    placeholder="blurred"
                                    objectFit="cover"
                                />
                            </Parallax>
                        </FullSizeImageWrapper>

                        <TwoImagesWrapper>
                            <StaticImage
                                src="../../img/placeholder-full.png"
                                alt="Placeholder"
                                placeholder="blurred"
                                objectFit="cover"
                            />
                            <StaticImage
                                src="../../img/placeholder-full.png"
                                alt="Placeholder"
                                placeholder="blurred"
                                objectFit="cover"
                            />
                        </TwoImagesWrapper>
                    </ContentContainer>

                    <FullPageImage>
                        <StaticImage
                            src="../../img/placeholder-2.png"
                            alt="Placeholder"
                            placeholder="blurred"
                            layout="fullWidth"
                        />
                    </FullPageImage>

                    <ContentContainer className="sm">
                        <Quote>{approach.quote}</Quote>
                    </ContentContainer>

                    <ContentContainer
                        id="results"
                        ref={refResults}
                        className="sm"
                    >
                        <TableStats>
                            <CellTitle>
                                <StyledNumber value={stats.screens} />
                            </CellTitle>
                            <StatsCaption className="space">
                                Screens
                            </StatsCaption>
                            <CellTitle>
                                <StyledNumber value={stats.screens} />
                            </CellTitle>
                            <StatsCaption>Screens</StatsCaption>

                            <CellTitle>
                                <StyledNumber value={stats.iterations} />
                            </CellTitle>
                            <StatsCaption className="space">
                                Iterations
                            </StatsCaption>
                            <CellTitle>
                                <StyledNumber value={stats.iterations} />
                            </CellTitle>
                            <StatsCaption>Iterations</StatsCaption>

                            <CellTitle>
                                <StyledNumber value={stats.prototypes} />
                            </CellTitle>
                            <StatsCaption className="space">
                                Prototypes
                            </StatsCaption>
                        </TableStats>
                    </ContentContainer>
                </ArticleSection>

                <ArticleSection id="credits">
                    <ContentContainer className="sm">
                        <H2>Credits</H2>
                        <TableCredits>
                            <CellTitle>{credits.concept}</CellTitle>
                            <div>{credits.conceptDesc}</div>
                            <CellTitle>{credits.design}</CellTitle>
                            <div>{credits.designDesc}</div>
                            <CellTitle>{credits.projectManagement}</CellTitle>
                            <div>{credits.projectManagementDesc}</div>
                        </TableCredits>
                    </ContentContainer>
                </ArticleSection>

                <ArticleSection id="another-projects">
                    <ContentContainer className="sm">
                        <H2>Other {category} Projects</H2>
                        <OtherProjects
                            projectsByCategory={projectsByCategory}
                        />
                    </ContentContainer>
                </ArticleSection>
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
                nameSlug: gatsbyPath(filePath: "/projects/{Project.name}")
            }
        }
    }
`;
