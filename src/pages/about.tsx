import { Fragment } from "react";

import { graphql, PageProps } from "gatsby";
import { useInViewEffect } from "react-hook-inview";
import tw, { css, styled } from "twin.macro";

import { ParallaxBackground } from "@components/about-parallax-background";
import { GridRow, MainContainer } from "@components/main-container";
import { Meta } from "@components/meta";
import { MotionCursor } from "@components/motion-cursor";
import PersonalPic from "@components/personal-pic";
import SelectedProjects from "@components/selected-projects";
import { SocialMedia } from "@components/social-media";
import { Tabs } from "@components/tabs";
import { Timeline } from "@components/timeline";
import { socialMedia } from "@data/social-media";
import { useTimelineViewport } from "@hooks/use-timeline-viewport";
import { useWindowSize } from "@hooks/use-window-size";
import { up } from "@utils/screens";

const HeroSection = styled.section(() => [
    tw`relative mb-20 lg:mb-0 lg:mt-0 lg:grid lg:grid-cols-12 lg:gap-7 lg:items-center lg:h-screen`,
    css`
        margin-top: 110px;
    `,
]);

const Info = styled.div(() => [
    tw`lg:col-start-5 lg:col-end-11 lg:pt-2.5 lg:flex lg:flex-col lg:justify-between`,
    css`
        ${up("lg")} {
            height: 386px;
        }
    `,
]);

const AboutStyle = styled.h2(() => [
    tw`leading-8 prose-24 font-fbold lg:prose-30 lg:leading-11`,
]);

const SocialMediaLinksCon = styled.div(() => [
    css`
        margin-top: 32px;
        a {
            color: #000;
            border: 1px solid #000;

            &:first-of-type {
                margin-left: 0;
            }

            &:hover {
                background: #000;
                color: #fff;
            }
        }

        ${up("lg")} {
            margin-top: 0;
        }
    `,
]);

const Article = styled.article(() => [tw`relative mb-6`]);

const TimelineWrapper = styled.aside(() => [
    tw`sticky top-0 right-0 z-20 hidden ml-auto lg:block`,
    css`
        margin-bottom: -254px;
        width: 220px;
        transform: translateY(90px);

        div[class*="ListItem"] {
            height: 57px;
            line-height: 16px;
        }

        div[class*="ListItem"]:nth-of-type(1n + 3) {
            width: 133px;
        }
    `,
]);

const ArticleSection = styled.section(() => [
    tw`mb-20 lg:grid lg:grid-cols-12 lg:grid-rows-1 lg:items-center`,
    css`
        &:first-of-type {
            margin-top: 48px;
        }

        ${up("lg")} {
            &:first-of-type {
                margin-top: 0;
            }

            margin-bottom: 7.5rem;
        }
    `,
]);

const TitleContainer = styled.div(() => [
    tw`mb-6 border-b border-black border-solid lg:col-start-1 lg:col-end-11 lg:grid lg:grid-cols-12`,
    css`
        padding-bottom: 5px;

        ${up("lg")} {
            padding-bottom: 27px;
        }
    `,
]);

const Title = styled.h2(() => [
    tw`h-10 -ml-px uppercase prose-30 leading-11 font-fbold lg:prose-54 lg:leading-16 lg:col-start-1 lg:col-end-4 lg:h-auto`,
]);

const DetailsContainer = styled.div(() => [
    tw`lg:col-start-1 lg:col-end-7`,
    css`
        max-width: 606px;
    `,
]);

const Details = styled.p(() => [
    tw`mb-10 leading-6 prose-16 font-base`,
    css`
        &:first-of-type {
            margin-bottom: 1.5rem;
        }
    `,
]);

const SkillsTable = styled.ul(() => [
    tw`grid grid-cols-2 grid-rows-3 border-b border-l border-black lg:grid-cols-3 lg:grid-rows-2`,
]);

const Skill = styled.li(() => [
    tw`flex items-center justify-center leading-5 text-center uppercase border-t border-r border-black font-fbold prose-18 lg:prose-20 lg:leading-7`,
    css`
        height: 78px;
        padding: 8px;

        ${up("lg")} {
            height: 100px;
        }
    `,
]);

const DesignProcessTable = styled.ul(() => [
    tw`grid grid-cols-1 grid-rows-4 border-b border-l border-black`,
]);

const DesignProcessElement = styled.li(() => [
    tw`flex flex-col justify-center p-4 border-t border-r border-black h-36 lg:flex-row lg:justify-between lg:p-5`,
]);

const DesignProcessTitleContainer = styled.div(() => [
    tw`flex mb-2 lg:mb-0 lg:mt-2`,
]);

const DesignProcessTitle = styled.h3(() => [
    tw`inline-block leading-8 capitalize prose-24 lg:prose-30 lg:leading-10 font-fbold`,
    css`
        margin-top: -2px;
    `,
]);

const DesignProcessNumber = styled.span(() => [
    tw`mr-3 leading-6 font-fbold prose-18 lg:prose-20 lg:leading-7`,
]);

const DesignProcessElementDesc = styled.p(() => [
    tw`font-base lg:self-center`,
    css`
        color: #808080;

        ${up("lg")} {
            width: 272px;
        }
    `,
]);

const SelectedProjectsContainer = styled.div(() => [
    tw`lg:col-start-1 lg:col-end-11 lg:ml-2 lg:mt-10`,
]);

interface Props extends PageProps {
    data: {
        aboutPageData: AboutPageData;
        projects: {
            nodes: Project[];
        };
    };
}

const aboutPageTimeline = {
    title: "Aga",
    id: "aboutInfo",
    items: [
        { id: "expertise", title: "Expertise" },
        { id: "design-process", title: "Design Process" },
        { id: "selected-projects", title: "Selected Projects" },
    ],
};

export default function About({ data }: Props) {
    const windowSize = useWindowSize();
    const hasSmallWindowWidth = windowSize.width < 1024;
    const { hero, expertise, designProcess } = data.aboutPageData;
    const projects = data.projects.nodes;

    const [activeItemId, intersection, options, onTimelineItemChange] =
        useTimelineViewport();

    const refExpertise = useInViewEffect(intersection, {
        ...options,
        rootMargin: "0px 0px 100% 0px",
    });
    const refDesignProcess = useInViewEffect(intersection, options);
    const refSelectedProjects = useInViewEffect(intersection, {
        ...options,
        rootMargin: "200% 0px 0px 0px",
    });

    const tabsTimeline = aboutPageTimeline.items.map((item) => {
        const titleArr = item.title.split(" ");
        const lastWordInTitle = titleArr.length - 1;
        const titleToDisplayOnMobile = titleArr[lastWordInTitle];

        return {
            ...item,
            title: titleToDisplayOnMobile,
        };
    });

    return (
        <Fragment>
            <MotionCursor />

            {!hasSmallWindowWidth && <ParallaxBackground />}

            <MainContainer>
                <GridRow>
                    <HeroSection>
                        <PersonalPic />
                        <Info>
                            <AboutStyle>{hero.description}</AboutStyle>

                            <SocialMediaLinksCon>
                                <SocialMedia
                                    items={socialMedia}
                                    variant={
                                        hasSmallWindowWidth ? "normal" : "big"
                                    }
                                />
                            </SocialMediaLinksCon>
                        </Info>
                    </HeroSection>

                    <Article>
                        <TimelineWrapper>
                            <Timeline
                                style={{ height: "254px" }}
                                activeItemId={activeItemId}
                                activeSectionId={aboutPageTimeline.id}
                                onTimelineItemChange={onTimelineItemChange}
                                sections={[aboutPageTimeline]}
                            />
                        </TimelineWrapper>

                        <Tabs
                            hideForDesktop={true}
                            onTabChange={onTimelineItemChange}
                            tabs={tabsTimeline}
                            activeTabId={activeItemId}
                        />

                        <ArticleSection id="expertise" ref={refExpertise}>
                            <TitleContainer>
                                <Title>Expertise</Title>
                            </TitleContainer>

                            <DetailsContainer>
                                <Details>{expertise.description}</Details>

                                <Details>{expertise.secondDescription}</Details>

                                <SkillsTable>
                                    {expertise.skills.map((skill, index) => (
                                        <Skill key={index}>{skill}</Skill>
                                    ))}
                                </SkillsTable>
                            </DetailsContainer>
                        </ArticleSection>

                        <ArticleSection
                            id="design-process"
                            ref={refDesignProcess}
                        >
                            <TitleContainer>
                                <Title>Design Process</Title>
                            </TitleContainer>

                            <DetailsContainer>
                                <Details>{designProcess.description}</Details>

                                <DesignProcessTable>
                                    {designProcess.designProcessPhases.map(
                                        (designProcessPhase) => (
                                            <DesignProcessElement
                                                key={
                                                    designProcessPhase.phaseNum
                                                }
                                            >
                                                <DesignProcessTitleContainer>
                                                    <DesignProcessNumber>
                                                        {
                                                            designProcessPhase.phaseNum
                                                        }
                                                    </DesignProcessNumber>
                                                    <DesignProcessTitle>
                                                        {
                                                            designProcessPhase.title
                                                        }
                                                    </DesignProcessTitle>
                                                </DesignProcessTitleContainer>
                                                <DesignProcessElementDesc>
                                                    {
                                                        designProcessPhase.description
                                                    }
                                                </DesignProcessElementDesc>
                                            </DesignProcessElement>
                                        )
                                    )}
                                </DesignProcessTable>
                            </DetailsContainer>
                        </ArticleSection>

                        <ArticleSection
                            id="selected-projects"
                            ref={refSelectedProjects}
                        >
                            <TitleContainer>
                                <Title>selected projects</Title>
                            </TitleContainer>
                            <SelectedProjectsContainer>
                                <SelectedProjects projects={projects} />
                            </SelectedProjectsContainer>
                        </ArticleSection>
                    </Article>
                </GridRow>
            </MainContainer>
        </Fragment>
    );
}

export const query = graphql`
    query {
        aboutPageData {
            ...aboutSectionsFields
        }

        projects: allProject {
            nodes {
                ...ProjectFields
                nameSlug: gatsbyPath(filePath: "/projects/{project.name}")
            }
        }
    }
`;

export const Head = () => <Meta title="About - Aga Chainska" />;
