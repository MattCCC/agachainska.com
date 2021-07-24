import { Fragment } from "react";

import { graphql, PageProps } from "gatsby";
import { useInViewEffect } from "react-hook-inview";
import tw, { css, styled } from "twin.macro";

import { GridRow, MainContainer } from "@components/main-container";
import { MotionCursor } from "@components/motion-cursor";
import PersonalPic from "@components/personal-pic";
import SelectedProjects  from "@components/selected-projects";
import { SocialMedia } from "@components/social-media";
import { Tabs } from "@components/tabs";
import { Timeline } from "@components/timeline";
import { aboutPageTimeline } from "@config/page-timlines";
import { socialMedia } from "@data/social-media";
import { useTimelineViewport } from "@hooks/use-timeline-viewport";
import { useWindowSize } from "@hooks/use-window-size";
import {up} from "@utils/screens";


const HeroSection = styled.section(() => [
    tw`relative mb-20 lg:mb-0 lg:mt-0 lg:grid lg:grid-cols-12 lg:gap-7 lg:items-center lg:h-screen`,
    css`
        margin-top: 110px;
    `
]);

const Info = styled.div(() => [
    tw`lg:col-start-5 lg:col-end-11 lg:pt-2.5 lg:flex lg:flex-col lg:justify-between`,
    css`
        ${up("lg")} {
            height: 386px;
        }
        
    `
]);

const AboutStyle = styled.h2(() => [
    tw`prose-24px font-fbold lg:prose-30px`,
]);

const SocialMediaLinksCon = styled.div(() => [
    css`
        margin-top: 32px;    
        a { 
            color: #000;
            border: 1px solid #000;
            
            &:first-child {
                margin-left: 0;
            }
        }

        ${up("lg")} {
            margin-top: 0;
        }
    `
]);

const Article = styled.article(() => [
    tw`relative mb-6`
]);

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
        
        // every first element starting from the 3rd element
        div[class*="ListItem"]:nth-child(1n + 3) {
            width: 133px;
        }
    `,
]);


const ArticleSection = styled.section(() => [
    tw`lg:grid lg:grid-cols-12 lg:grid-rows-1 lg:items-center`,
    css`
        &:first-of-type {
            margin-top: 48px;
        }

        ${up("lg")} {
            &:first-of-type {
                margin-top: 0;
            }                
        }
    `
]);

const TitleContainer = styled.div(() => [
    tw`border-b border-black border-solid mb-6 lg:col-start-1 lg:col-end-11 lg:grid lg:grid-cols-12`,
    css`
        padding-bottom: 5px;

        ${up("lg")} {
            padding-bottom: 27px;
        }
    `
]);

const Title = styled.h2(() => [
    tw`prose-30px h-10 font-fbold uppercase -ml-px lg:prose-54px lg:col-start-1 lg:col-end-4 lg:h-auto`
]);

const DetailsContainer = styled.div(() => [
    tw`mb-20 lg:col-start-1 lg:col-end-7`,
    css`
        max-width: 606px;   
    `
]);

const Details = styled.p(() => [
    tw`prose-16px-h24 font-base mb-10`
]);

const SkillsTable = styled.ul(() => [
    tw`grid grid-cols-2 grid-rows-3 lg:grid-cols-3 lg:grid-rows-2 border-black border-b border-l`
]);

const Skill = styled.li(() => [
    tw`flex items-center justify-center font-fbold text-center uppercase prose-18px lg:prose-20px 
    leading-6 border-black border-t border-r`,
    css`
        height: 78px;
        padding: 8px;

        ${up("lg")} {
            height: 100px;
        }
    `
]);

const DesignProcessTable = styled.ul(() => [
    tw`grid grid-cols-1 grid-rows-4 border-black border-b border-l`
]);

const DesignProcessElement = styled.li(() => [
    tw`h-36 flex flex-col justify-center lg:flex-row lg:justify-between p-4 lg:p-5 border-black border-t border-r`,
]);

const DesignProcessTitleContainer = styled.div(() => [
    tw`flex mb-2 lg:mb-0 lg:mt-2`
]);

const DesignProcessTitle = styled.h3(() => [
    tw`prose-24px lg:prose-30px-h40 font-fbold capitalize inline-block`,
    css`
        margin-top: -2px;
    `
]);

const DesignProcessNumber = styled.span(() => [
    tw`font-fbold prose-18px-h24 lg:prose-20px mr-3`
]);

const DesignProcessElementDesc = styled.p(() => [
    tw`font-base lg:self-center`,
    css`
        color: #808080;

        ${up("lg")} {
            width: 272px;
        }
    `
]);

const SelectedProjectsContainer = styled.div(() => [
    tw`lg:col-start-1 lg:col-end-11 lg:ml-2 lg:mt-10`
]);

interface Props extends PageProps {
    data: {
        aboutPageData: AboutPageData;
        projects: {
            nodes: Project[];
        };
    };
}

export default function About({ data }: Props): JSX.Element {
    const windowSize = useWindowSize();
    const hasSmallWindowWidth = windowSize.width < 1024;
    const {hero, expertise, designProcess} = data.aboutPageData;
    const projects = data.projects.nodes;

    const [
        activeItemId,
        intersection,
        options,
        onTimelineItemChange,
    ] = useTimelineViewport();

    const refExpertise = useInViewEffect(intersection, options);
    const refDesignProcess = useInViewEffect(intersection, options);
    const refSelectedProjects = useInViewEffect(intersection, options);

    const tabsTimeline = aboutPageTimeline[0].items.map((item) => {
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

            <MainContainer>
                <GridRow>
                    <HeroSection>
                        <PersonalPic />
                        <Info>
                            <AboutStyle>
                                {hero.description}
                            </AboutStyle>

                            <SocialMediaLinksCon>
                                <SocialMedia items={socialMedia}
                                    variant={hasSmallWindowWidth ? "normal" : "big"}
                                />
                            </SocialMediaLinksCon>
                        </Info>
                    </HeroSection>

                    <Article>
                        <TimelineWrapper>
                            <Timeline
                                style={{ height: "254px" }}
                                activeItemId={activeItemId}
                                activeSectionId={aboutPageTimeline[0].id}
                                onTimelineItemChange={onTimelineItemChange}
                                sections={aboutPageTimeline}
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
                                <Title>
                                    Expertise
                                </Title>
                            </TitleContainer>

                            <DetailsContainer>
                                <Details>
                                    {expertise.description}
                                </Details>

                                <SkillsTable>
                                    {expertise.skills.map((skill, index) => (
                                        <Skill key={index}>
                                            {skill}
                                        </Skill>
                                    ))}
                                </SkillsTable>
                            </DetailsContainer>
                        </ArticleSection>

                        <ArticleSection id="design-process" ref={refDesignProcess}>
                            <TitleContainer>
                                <Title>
                                    Design Process
                                </Title>
                            </TitleContainer>

                            <DetailsContainer>
                                <Details>
                                    {designProcess.description}
                                </Details>

                                <DesignProcessTable>
                                    {designProcess.designProcessPhases.map((designProcessPhase) => (
                                        <DesignProcessElement key={designProcessPhase.phaseNum}>
                                            <DesignProcessTitleContainer>
                                                <DesignProcessNumber>
                                                    {designProcessPhase.phaseNum}
                                                </DesignProcessNumber>
                                                <DesignProcessTitle>
                                                    {designProcessPhase.title}
                                                </DesignProcessTitle>
                                            </DesignProcessTitleContainer>
                                            <DesignProcessElementDesc>
                                                {designProcessPhase.description}
                                            </DesignProcessElementDesc>
                                        </DesignProcessElement>
                                    ))}
                                </DesignProcessTable>
                            </DetailsContainer>
                        </ArticleSection>

                        <ArticleSection id="selected-projects" ref={refSelectedProjects}>
                            <TitleContainer>
                                <Title>
                                    selected projects
                                </Title>
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
