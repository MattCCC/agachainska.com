import { Fragment, useCallback, useEffect, useState } from "react";
import { graphql, PageProps } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { Header } from "@components/header";
import { H2 } from "@components/h2";
import { H3 } from "@components/h3";
import { Timeline } from "@components/timeline";
import { BigNumber } from "@components/big-number";
import { useStore } from "@store/index";
import tw, { css, styled } from "twin.macro";
import { designProcessTimeline } from "@config/page-timlines";
import { useInViewEffect } from "react-hook-inview";
import { thresholdArray } from "@utils/threshold-array";
import { Quote } from "@components/quote";
import { up } from "@utils/screens";
import { MainTitle } from "@components/main-title";

/**
 * Styles
 */
const MainSection = styled.section(() => [
    tw`relative mx-auto z-10`,
    css`
        max-width: 1069px;
        padding: 0 15px;

        p {
            margin-bottom: 40px;
        }
    `,
]);

const ContentContainer = styled.div(() => [
    css`
        max-width: 1069px;

        &.sm {
            width: 827px;
            max-width: 100%;
        }
    `,
]);

const HeroImage = styled.div(() => [
    tw`relative z-10`,
    css`
        height: 200px;
        width: 1069px;
        max-width: 100%;
        background: url("/img/projects/danish-bakery.jpg");
        background-color: rgba(255, 255, 255, 0.8);
        background-size: contain;

        ${up("lg")} {
            background-size: cover;
            height: 462px;
        }
    `,
]);

const TableProject = styled.div(() => [
    tw`grid grid-cols-1 lg:grid-cols-2 grid-rows-4 grid-flow-row lg:grid-flow-col`,
    css`
        width: 827px;
        max-width: 100%;
        line-height: 24px;
    `,
]);

const TableCredits = styled.div(() => [
    tw`grid grid-cols-1 lg:grid-cols-3 grid-rows-2 grid-flow-row lg:grid-flow-col`,
    css`
        width: 827px;
        max-width: 100%;
        line-height: 24px;
    `,
]);

const TableStats = styled.div(() => [
    tw`grid grid-cols-1 lg:grid-cols-3 grid-flow-row lg:grid-flow-col`,
    css`
        grid-template-rows: repeat(4, minmax(0, max-content));
        width: 827px;
        max-width: 100%;
        line-height: 24px;
    `,
]);

const CellTitle = styled.div(() => [
    css`
        margin-top: 12px;
        font-family: "Larsseit-Bold";
    `,
]);

const Article = styled.article(() => [
    tw`relative`,
    css`
        padding-bottom: 140px;
    `,
]);

const ArticleSection = styled.section(() => [
    tw`relative mx-auto z-10`,
    css`
        max-width: 1069px;
        padding: 0 15px 1px;

        p {
            margin-bottom: 40px;
        }
    `,
]);

const TimelineWrapper = styled.aside(() => [
    tw`sticky hidden lg:block z-20`,
    css`
        top: 0;
        right: 0;
        margin-bottom: -254px;
        width: 220px;
        margin-left: auto;
        margin-right: 84px;
        transform: translateY(90px);
    `,
]);

const H4 = styled.h4(() => [
    css`
        height: 40px;
        font-family: "Larsseit-Bold";
        font-size: 30px;
        line-height: 40px;
        padding-left: 25%;

        &.space {
            ${up("lg")} {
                margin-bottom: 150px;
            }
        }

        ${up("lg")} {
            padding-left: 10px;
        }
    `,
]);

const StyledNumber = styled(BigNumber)(() => [
    css`
        max-width: 100%;
        transform: translateX(50%);
        width: 150px;

        ${up("lg")} {
            transform: none;
            width: 136px;
            height: 117px;
        }
    `,
]);

const FullPageImgWrapper = styled.div(() => [
    css`
        max-width: 100%;
        width: 100%;
        border: 1px solid #979797;
        margin-bottom: 40px;

        ${up("lg")} {
            max-width: none;
            width: 100vw;
            position: relative;
            height: auto;
            margin: 0 auto 90px -50vw;
            left: calc(50% - 8px);
        }
    `,
]);

const FullSizeImageWrapper = styled.div(() => [
    css`
        margin-bottom: 90px;

        ${up("lg")} {
            height: 546px;
        }
    `,
]);

const TwoImagesWrapper = styled.div(() => [
    tw`grid grid-cols-2 grid-flow-col gap-6`,
    css`
        margin-bottom: 90px;
        height: 220px;

        ${up("lg")} {
            height: 562px;
        }
    `,
]);

/**
 * Interfaces
 */
interface Project {
    name: string;
    client: string;
    agency: string;
    timeframe: string;
    roleInProject: string;
    challenge: Record<string, string>;
    approach: Record<string, string>;
    stats: Record<string, number>;
    credits: Record<string, string>;
}

interface Props extends PageProps {
    data: {
        project: Project;
    };
}

const options = {
    rootMargin: "0px",
    threshold: thresholdArray(20),
};

/**
 * Component
 * @param props
 */
export default function Project({ data }: Props): JSX.Element {
    const [, dispatch] = useStore();
    const [activeItemId, setActiveItemId] = useState(
        (window.location.hash || "challenge").replace("#", "")
    );

    useEffect(() => {
        dispatch.showMotionGrid(false);
        dispatch.showWavePattern(false);
    }, [dispatch]);

    const pctInViewport = {} as Record<string, number>;

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

    const {
        name,
        client,
        agency,
        timeframe,
        roleInProject,
        challenge,
        approach,
        stats,
        credits,
    } = data.project;

    const onTimelineItemChange = useCallback(({ id }): void => {
        window.location.hash = "#" + id;
    }, []);

    return (
        <Fragment>
            <Header />
            <MainSection>
                <ContentContainer className="pt-28 lg:pt-32">
                    <HeroImage />
                    <MainTitle data-text={name}>{name}</MainTitle>
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
                        <p>{challenge.overview}</p>
                        <H3>Project goals</H3>
                        <p>{challenge.projectGoals}</p>
                        <H3>Audience</H3>
                        <p>{challenge.audience}</p>
                    </ContentContainer>
                </ArticleSection>

                <ArticleSection id="approach" ref={refApproach}>
                    <ContentContainer className="sm">
                        <H2>Approach</H2>
                        <H3>Brand elements</H3>
                        <p>{approach.brandElements}</p>
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
                                <StyledNumber value={14} />
                            </CellTitle>
                            <H4 className="space">Screens</H4>
                            <CellTitle>
                                <StyledNumber value={14} />
                            </CellTitle>
                            <H4>Screens</H4>

                            <CellTitle>
                                <StyledNumber value={6} />
                            </CellTitle>
                            <H4 className="space">Iterations</H4>
                            <CellTitle>
                                <StyledNumber value={6} />
                            </CellTitle>
                            <H4>Iterations</H4>

                            <CellTitle>
                                <StyledNumber value={34} />
                            </CellTitle>
                            <H4 className="space">Prototypes</H4>
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
                        <H2>Other UX Projects</H2>
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
            </Article>
        </Fragment>
    );
}

export const query = graphql`
    query($id: String!) {
        project(id: { eq: $id }) {
            ...ProjectFields
        }
    }
`;
