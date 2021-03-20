import { Fragment, useCallback, useEffect, useState } from "react";
import { graphql, PageProps } from "gatsby";
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

/**
 * Styles
 */
const Section = styled.section(() => [
    tw`relative mx-auto z-10`,
    css`
        max-width: 1039px;

        p {
            margin-bottom: 40px;
        }
    `,
]);

const ContentContainer = styled.div(() => [
    css`
        max-width: 1039px;

        &.sm {
            width: 827px;
        }
    `,
]);

const HeroImage = styled.div(() => [
    tw`relative z-10`,
    css`
        height: 462px;
        width: 1039px;
        margin-top: 40px;
        background: url("/img/projects/project1.jpg");
        background-color: rgba(255, 255, 255, 0.8);
        background-size: cover;
    `,
]);

const TableProject = styled.div(() => [
    tw`grid grid-cols-2 grid-rows-4 grid-flow-col`,
    css`
        width: 827px;
        max-width: 100%;
        line-height: 24px;
    `,
]);

const TableCredits = styled.div(() => [
    tw`grid grid-cols-3 grid-rows-2 grid-flow-col`,
    css`
        width: 827px;
        max-width: 100%;
        line-height: 24px;
    `,
]);

const TableStats = styled.div(() => [
    tw`grid grid-cols-3 grid-rows-4 grid-flow-col`,
    css`
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

const PageTitle = styled.h1(() => [
    tw`relative z-10`,
    css`
        top: -80px;
        color: var(--black-color);
        background: linear-gradient(
            0deg,
            var(--black-color) 50px,
            transparent 50px
        );
        background-clip: text;
        font-size: 120px;
        height: 130px;
        width: 100%;
        -webkit-text-fill-color: transparent;
        font-family: "Larsseit-Bold";

        &:before {
            position: absolute;
            left: 0;
            bottom: 0;
            content: attr(data-text);
            clip-path: circle(500px at 10px 10px);
            -webkit-text-stroke-width: 2px;
            -webkit-text-stroke-color: rgba(0, 0, 0, 0.8);
            height: 100%;
            width: 100%;
        }
    `,
]);

const Article = styled.article(() => [
    tw`relative`,
    css`
        padding-bottom: 140px;
    `,
]);

const Quote = styled.div(() => [
    css`
        color: #828282;
        font-family: "Larsseit";
        font-size: 48px;
        font-weight: 700;
        line-height: 56px;
        margin-bottom: 140px;
    `,
]);

const TimelineWrapper = styled.aside(() => [
    tw`sticky`,
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
        width: 109px;
        font-family: "Larsseit-Bold";
        font-size: 30px;
        line-height: 40px;
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

/**
 * Component
 * @param props
 */
export default function Project({ data }: Props): JSX.Element {
    const [, dispatch] = useStore();
    const [activeItemId, setActiveItemId] = useState("challenge");

    useEffect(() => {
        dispatch.showMotionGrid(false);
        dispatch.showWavePattern(false);
    }, [dispatch]);

    const pctInViewport = {} as Record<string, number>;

    const options = {
        rootMargin: "0px",
        threshold: thresholdArray(20),
    };

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
            <Section>
                <ContentContainer className="lg:pt-20">
                    <HeroImage />
                    <PageTitle data-text={name}>{name}</PageTitle>
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
            </Section>
            <Article>
                <TimelineWrapper>
                    <Timeline
                        style={{ height: "254px" }}
                        activeItemId={activeItemId}
                        onTimelineItemChange={onTimelineItemChange}
                        sections={designProcessTimeline}
                    />
                </TimelineWrapper>

                <Section>
                    <ContentContainer
                        ref={refChallenge}
                        id="challenge"
                        className="sm"
                    >
                        <H2>Challenge</H2>
                        <H3>Overview</H3>
                        <p>{challenge.overview}</p>
                        <H3>Project goals</H3>
                        <p>{challenge.projectGoals}</p>
                        <H3>Audience</H3>
                        <p>{challenge.audience}</p>
                    </ContentContainer>
                </Section>
                <Section>
                    <ContentContainer
                        ref={refApproach}
                        id="approach"
                        className="sm"
                    >
                        <H2>Approach</H2>
                        <H3>Brand elements</H3>
                        <p>{approach.brandElements}</p>
                        <Quote>{approach.quote}</Quote>
                    </ContentContainer>
                    <ContentContainer
                        ref={refResults}
                        id="results"
                        className="sm"
                    >
                        <TableStats>
                            <CellTitle>
                                <BigNumber
                                    value={14}
                                    style={{ width: "330px" }}
                                />
                            </CellTitle>
                            <H4>Screens</H4>
                            <CellTitle>
                                <BigNumber
                                    value={14}
                                    style={{ width: "380px" }}
                                />
                            </CellTitle>
                            <H4>Screens</H4>

                            <CellTitle>
                                <BigNumber
                                    value={6}
                                    style={{ width: "330px" }}
                                />
                            </CellTitle>
                            <H4>Iterations</H4>
                            <CellTitle>
                                <BigNumber
                                    value={6}
                                    style={{ width: "380px" }}
                                />
                            </CellTitle>
                            <H4>Iterations</H4>

                            <CellTitle>
                                <BigNumber
                                    value={34}
                                    style={{ width: "330px" }}
                                />
                            </CellTitle>
                            <H4>Prototypes</H4>
                        </TableStats>
                    </ContentContainer>
                </Section>
                <Section>
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
                </Section>
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
