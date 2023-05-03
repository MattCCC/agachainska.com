import { Fragment, useEffect, useMemo, useState } from "react";

import { GetStaticProps } from "next";
import { useInViewEffect } from "react-hook-inview";
import tw, { css, styled } from "twin.macro";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { ParallaxBackground } from "components/about-parallax-background";
import { MainContainer } from "components/main-container";
import { Meta } from "components/meta";
import { MotionCursor } from "components/motion-cursor";
import PersonalPic from "components/personal-pic";
import SeeAllProjectsLink from "components/see-all-projects-link";
import SelectedProjects from "components/selected-projects";
import { SocialMedia } from "components/social-media";
import { Tabs } from "components/tabs";
import { useTimelineViewport } from "hooks/use-timeline-viewport";
import { useWindowSize } from "hooks/use-window-size";
import { up } from "utils/screens";
import dynamic from "next/dynamic";
import { Project, ProjectNode } from "types/project";
import client from "tina/__generated__/client";
import {
    ConfigurationQuery,
    ConfigurationQueryVariables,
    PageQuery,
    PageQueryVariables,
} from "tina/__generated__/types";
import { HTMLInline } from "components/tina-render-html";
import { TinaMarkdown } from "tinacms/dist/rich-text";

const HeroSection = styled.section(() => [
    tw`relative mb-20 lg:mb-0 lg:mt-0 lg:grid lg:grid-cols-12 lg:gap-7 lg:items-center lg:h-[max(600px,100vh)]`,
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
    tw`mt-[32px] lg:mt-0`,
    css`
        a {
            ${tw`text-black border border-black border-solid first-of-type:ml-0 hover:bg-black hover:text-white`}
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

        &:last-of-type {
            margin: 0;
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

const Details = styled.div(() => [
    tw`mb-10 leading-6 prose-16 font-base`,
    css`
        p {
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

const DesignProcessElementDesc = styled.div(() => [
    tw`font-base lg:self-center`,
    css`
        color: #808080;

        ${up("lg")} {
            width: 272px;
        }
    `,
]);

const SelectedProjectsContainer = styled.div(() => [
    tw`lg:col-start-1 lg:col-end-11 lg:ml-2 lg:mt-10 cursor-none!`,
]);

const TimelineNoSSR = dynamic(() => import("../components/timeline"), {
    ssr: false,
});

interface Page {
    data: PageQuery;
    query: string;
    variables: PageQueryVariables;
}

interface Configuration {
    data: ConfigurationQuery;
    query: string;
    variables: ConfigurationQueryVariables;
}

type AboutPage = Extract<
    PageQuery["page"],
    {
        __typename?: "PageAbout";
    }
>;

type ConfigurationPage = Extract<
    ConfigurationQuery["configuration"],
    {
        __typename?: "ConfigurationSocialMedia";
    }
>;

interface Props {
    aboutPageData: AboutPage;
    socialMediaData: ConfigurationPage;
    projects: Project[];
}

const prependZeroes = (num: number) =>
    num.toString().length === 1 ? `0${num}` : num;

export default function About({
    aboutPageData,
    socialMediaData,
    projects,
}: Props) {
    const windowSize = useWindowSize();
    const [hasSmallWindowWidth, setWindowWidth] = useState(false);

    useEffect(() => {
        setWindowWidth(windowSize.width < 1024);
    }, [windowSize]);

    const { hero, expertise, design_process, skills, translations } =
        aboutPageData;

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

    const aboutPageTimeline = useMemo(
        () => ({
            title: "Aga",
            id: "aboutInfo",
            items: [
                {
                    id: "expertise",
                    title: translations?.expertise || "",
                },
                {
                    id: "design-process",
                    title: translations?.designProcess || "",
                },
                {
                    id: "selected-projects",
                    title: translations?.selectedProjects || "",
                },
            ],
        }),
        [translations]
    );

    const tabsTimeline = useMemo(
        () =>
            aboutPageTimeline.items.map((item) => {
                const titleArr = item.title.split(" ");
                const lastWordInTitle = titleArr.length - 1;

                return {
                    ...item,
                    title: titleArr[lastWordInTitle],
                };
            }),
        [aboutPageTimeline.items]
    );

    return (
        <Fragment>
            <Meta title="`${aboutPageData.title} · Aga Chainska`" />

            <MotionCursor />

            {!hasSmallWindowWidth && <ParallaxBackground />}

            <MainContainer>
                <div tw="col-start-1 col-end-13">
                    <HeroSection>
                        <PersonalPic />
                        <Info>
                            <AboutStyle>
                                <TinaMarkdown
                                    components={HTMLInline}
                                    content={hero?.description || ""}
                                />
                            </AboutStyle>

                            <SocialMediaLinksCon>
                                <SocialMedia
                                    items={socialMediaData.socialMedia.map(
                                        ({ name, link }) => ({
                                            name,
                                            url: link,
                                        })
                                    )}
                                    variant={
                                        hasSmallWindowWidth ? "normal" : "big"
                                    }
                                />
                            </SocialMediaLinksCon>
                        </Info>
                    </HeroSection>

                    <Article>
                        <TimelineWrapper>
                            <TimelineNoSSR
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
                                <Title>{translations?.expertise}</Title>
                            </TitleContainer>

                            <DetailsContainer>
                                <Details>
                                    <TinaMarkdown
                                        components={HTMLInline}
                                        content={expertise?.description || ""}
                                    />
                                </Details>

                                <SkillsTable>
                                    {(skills || []).map((skill, index) => (
                                        <Skill key={index}>
                                            {skill?.title || ""}
                                        </Skill>
                                    ))}
                                </SkillsTable>
                            </DetailsContainer>
                        </ArticleSection>

                        <ArticleSection
                            id="design-process"
                            ref={refDesignProcess}
                        >
                            <TitleContainer>
                                <Title>{translations?.designProcess}</Title>
                            </TitleContainer>

                            <DetailsContainer>
                                <Details>
                                    <TinaMarkdown
                                        components={HTMLInline}
                                        content={
                                            design_process?.description || ""
                                        }
                                    />
                                </Details>

                                <DesignProcessTable>
                                    {(design_process?.phases || []).map(
                                        (phase) => (
                                            <DesignProcessElement
                                                key={phase.phaseNum}
                                            >
                                                <DesignProcessTitleContainer>
                                                    <DesignProcessNumber>
                                                        {prependZeroes(
                                                            Number(
                                                                phase.phaseNum
                                                            )
                                                        )}
                                                    </DesignProcessNumber>
                                                    <DesignProcessTitle>
                                                        {phase.title}
                                                    </DesignProcessTitle>
                                                </DesignProcessTitleContainer>
                                                <DesignProcessElementDesc>
                                                    <TinaMarkdown
                                                        components={HTMLInline}
                                                        content={
                                                            phase.description ||
                                                            ""
                                                        }
                                                    />
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
                                <Title>{translations?.selectedProjects}</Title>
                                <SeeAllProjectsLink screenSize="lg" />
                            </TitleContainer>
                            <SelectedProjectsContainer>
                                <SelectedProjects
                                    projects={projects}
                                    limit={4}
                                />
                            </SelectedProjectsContainer>
                        </ArticleSection>
                    </Article>
                </div>
            </MainContainer>
        </Fragment>
    );
}

export const getServerSideProps: GetStaticProps = async ({ locale = "en" }) => {
    const projects = [] as ProjectNode[];

    let aboutPageData = {
        data: {},
        query: "",
        variables: {
            relativePath: `${locale}/about.md`,
        },
    } as Page;

    let socialMediaData = {
        data: {},
        query: "",
        variables: {
            relativePath: `${locale}/social-media.md`,
        },
    } as Configuration;

    try {
        const { variables, data, query } = await client.queries.configuration(
            socialMediaData.variables
        );

        socialMediaData = { variables, data, query };
    } catch {
        return {
            notFound: true,
        };
    }

    try {
        const { variables, data, query } = await client.queries.page(
            aboutPageData.variables
        );

        aboutPageData = { variables, data, query };
    } catch {
        return {
            notFound: true,
        };
    }

    const { data: dataSrc } = await client.queries.projectConnection();

    if (dataSrc.projectConnection.edges) {
        for (const edge of dataSrc.projectConnection.edges) {
            if (edge?.node) {
                projects.push(edge.node);
            }
        }
    }

    return {
        props: {
            ...(await serverSideTranslations(locale)),
            projects,
            socialMediaData: socialMediaData.data.configuration,
            aboutPageData: aboutPageData.data.page,
        },
    };
};
