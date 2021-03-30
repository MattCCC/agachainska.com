import { Fragment, useCallback, useEffect, useMemo, useState } from "react";

import { graphql, PageProps } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { useInViewEffect } from "react-hook-inview";

import { H2 } from "@components/h2";
import { H3 } from "@components/h3";
import { Header } from "@components/header";
import { Link } from "@components/link";
import { MotionCursor } from "@components/motion-cursor";
import { Quote } from "@components/quote";
import { Timeline } from "@components/timeline";
import { Translate } from "@components/translate";
import { designProcessTimeline } from "@config/page-timlines";
import { OtherProjects } from "@domain/single-project/other-projects";
import {
    MainSection,
    Button,
    CellTitle,
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
    FullPageImgWrapper,
    TableStats,
    StyledNumber,
    StatsCaption,
    TableCredits,
    MainTitle,
} from "@domain/single-project/styled";
import { useStoreProp } from "@store/index";
import { thresholdArray } from "@utils/threshold-array";

/**
 * Interfaces
 */
interface Navigation {
    hasPreviousButton: boolean;
    hasNextButton: boolean;
    previousTo: string;
    nextTo: string;
}

export interface ProjectByCategory {
    others: Project[];
    filteredProjects: ProjectByCurrentCategory[];
}

interface ProjectByCurrentCategory {
    uid: number;
    nameSlug: string;
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

/**
 * Component
 */
export default function Project({ data }: Props): JSX.Element {
    const [, dispatch] = useStoreProp("showMotionGrid");

    const [activeItemId, setActiveItemId] = useState(
        (window.location.hash || "challenge").replace("#", "")
    );

    const {
        uid,
        name,
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

    const [projectsByCategory, setProjectsByCategory] = useState({
        others: [],
        filteredProjects: [],
    } as ProjectByCategory);

    const [navigation, setNavigation] = useState({
        hasPreviousButton: false,
        hasNextButton: false,
    } as Navigation);

    useEffect(() => {
        dispatch.showMotionGrid(false);
        dispatch.showWavePattern(false);
    }, [dispatch]);

    useEffect(() => {
        if (projects.length === 0) {
            return;
        }

        const filteredProjectsInState: ProjectByCurrentCategory[] =
            projectsByCategory.filteredProjects;
        const otherProjectsInState: Project[] = projectsByCategory.others;

        const filteredProjectsByCategory: ProjectByCurrentCategory[] = projects
            .filter((project: Project) => project.category === category)
            .map((currentProject: Project) => ({
                uid: currentProject.uid,
                nameSlug: currentProject.nameSlug,
            }));

        const otherProjects: Project[] = projects.filter(
            (project: Project) => project.subCategory === "Others"
        );

        if (
            (otherProjects.length === 0 &&
                filteredProjectsByCategory.length === 0) ||
            (otherProjects.length === otherProjectsInState.length &&
                filteredProjectsByCategory.length ===
                    filteredProjectsInState.length)
        ) {
            return;
        }

        setProjectsByCategory(
            (prevState) =>
                ({
                    ...prevState,
                    others: otherProjects,
                    filteredProjects: filteredProjectsByCategory,
                } as ProjectByCategory)
        );
    }, [category, projects, uid, projectsByCategory, setProjectsByCategory]);

    const onPaginate = useCallback(
        (num: number): string | boolean => {
            if (projectsByCategory.filteredProjects.length === 0) {
                return false;
            }

            const projectIndex = projectsByCategory.filteredProjects.findIndex(
                (currentProject: ProjectByCurrentCategory) =>
                    currentProject.uid === uid
            );

            if (projectIndex <= -1 || !projects[projectIndex + num]) {
                return false;
            }

            const { nameSlug } = projects[
                projectIndex + num
            ] as ProjectByCurrentCategory;

            return nameSlug;
        },
        [projects, projectsByCategory, uid]
    );

    useEffect(() => {
        const projectsList: ProjectByCurrentCategory[] =
            projectsByCategory.filteredProjects;

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
    }, [onPaginate, projectsByCategory, setNavigation, uid]);

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
            <MotionCursor onPositionUpdate={(): void => null}>
                <Translate id="viewWork" />
            </MotionCursor>

            <MainSection>
                <ContentContainer className="pt-28 lg:pt-32">
                    <HeroImage />
                    <MainTitle
                        percentage={80}
                        baseFontSize={120}
                        smBaseFontSize={70}
                        data-text={name}
                    >
                        {name}
                    </MainTitle>
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
                </ContentContainer>
            </MainSection>
            <Article>
                <TimelineWrapper>
                    <Timeline
                        style={{ height: "254px" }}
                        activeItemId={activeItemId}
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
                            <StaticImage
                                src="../../img/placeholder-full.png"
                                alt="Placeholder"
                                placeholder="blurred"
                                objectFit="cover"
                            />
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

                    <FullPageImgWrapper>
                        <StaticImage
                            src="../../img/placeholder-2.png"
                            alt="Placeholder"
                            placeholder="blurred"
                            layout="fullWidth"
                        />
                    </FullPageImgWrapper>

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
