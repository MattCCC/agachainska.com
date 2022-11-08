import { Fragment } from "react";

import { graphql, PageProps } from "gatsby";
import type { HeadProps } from "gatsby";
import { useInViewEffect } from "react-hook-inview";
import tw, { css, styled } from "twin.macro";

import { BigNumber } from "components/big-number";
import { DeviceMockup } from "components/device-mockup";
import { DevicesCarousel } from "components/devices-carousel";
import { FullPageContent } from "components/full-page-content";
import { H2 } from "components/h2";
import { H3 } from "components/h3";
import { H4 } from "components/h4";
import { Link } from "components/link";
import { GridRow } from "components/main-container";
import { MainContainer } from "components/main-container";
import { MainTitleBottom } from "components/main-title";
import { Meta } from "components/meta";
import { MotionCursor } from "components/motion-cursor";
import { ParallaxBackground } from "components/parallax-background";
import { Quote } from "components/quote";
import { Tabs } from "components/tabs";
import { Timeline } from "components/timeline";
import ViewOnDeskStar from "components/view-on-desktop-star";
import { GallerySlider } from "domain/single-project/gallery-slider";
import { OtherProjects } from "domain/single-project/other-projects";
import { useIncrementStats } from "domain/single-project/use-increment-stats";
import { usePagination } from "domain/single-project/use-pagination";
import {
    ProjectsByCategory,
    useProjectsByCategory,
} from "hooks/use-projects-by-category";
import { useTimelineViewport } from "hooks/use-timeline-viewport";
import { useWindowSize } from "hooks/use-window-size";
import { ReactComponent as PrevIcon } from "svg/down.svg";
import { ReactComponent as NextIcon } from "svg/up.svg";
import { up } from "utils/screens";
import { includeProps } from "utils/styled";

interface Props extends PageProps {
    data: {
        project: Project;
        projects: {
            nodes: Project[];
        };
    };
}
interface ContentContainerProps {
    variant?: string;
}

const MainSection = styled(
    MainContainer,
    includeProps(["topPadding"])
)(() => [tw`absolute z-10 col-start-2 col-end-13`]);

const ContentContainer = styled.div(
    ({ variant = "3/4" }: ContentContainerProps) => [
        tw`max-w-full`,
        variant === "3/4" && tw`w-[613px]`,
        variant === "full" && tw`w-[820px]`,
    ]
);

const MainTitleWrapper = styled.div(
    tw`absolute max-w-[90%] bottom-[-43px] lg:bottom-[-74px]`
);

const MainTitle = styled(MainTitleBottom)(() => [
    tw`uppercase bg-project-title-gradient lg:bg-project-title-gradient-lg`,
    tw`text-[70px] leading-[70px] top-[-27px] mb-[-27px] lg:top-[-46px] lg:mb-[-46px] lg:text-[120px] lg:leading-[130px]`,
]);

const Paragraph = styled.p(() => [tw`mb-[40px]`]);

const StyledNumber = styled(BigNumber)(() => [
    tw`max-w-full translate-x-1/2`,
    tw`w-[150px] lg:w-[136px] lg:h-[117px] lg:transform-none`,
]);

const HeroWrapper = styled.div(() => [
    tw`relative w-full col-start-1 col-end-13 lg:col-start-2 lg:col-end-12`,
    tw`mb-[70px] h-[200px] sm:h-[320px] md:h-[390px] lg:h-[462px] lg:mb-[90px]`,
]);

const TableProject = styled.div(() => [
    tw`grid max-w-full grid-flow-row grid-cols-1 grid-rows-4 mb-20 lg:grid-cols-2 lg:grid-flow-col`,
    tw`w-[820px] leading-[24px]`,
]);

const TableCredits = styled.div(() => [
    tw`grid max-w-full grid-flow-row grid-cols-1 grid-rows-2 lg:grid-cols-3 lg:grid-flow-col`,
    tw`w-[820px] leading-[24px]`,
]);

const TableStats = styled.div(() => [
    tw`grid max-w-full grid-flow-row grid-cols-1 lg:grid-cols-3 lg:grid-flow-row`,
    tw`w-[820px] leading-[24px]`,
]);

const SingleStat = styled.div(() => [
    css`
        &.space {
            ${tw`lg:mb-[150px]`}
        }
    `,
]);

const StatsCaption = styled(H4)(() => [tw`pl-[25%] lg:pl-[10px]`]);

const CellTitle = styled.div(() => [tw`font-fbold`, tw`mt-[12px]`]);

const Article = styled.article(() => [tw`relative`]);

const ArticleSection = styled.section(() => [
    tw`relative z-10 mx-auto`,
    tw`max-w-[1069px] px-[15px] pb-[1px]`,
]);

const TimelineWrapper = styled.aside(() => [
    tw`sticky top-0 right-0 z-20 hidden ml-auto lg:block lg:col-start-11`,
    tw`w-[220px] mb-[-254px] mr-[84px] translate-y-[90px]`,
]);

/**
 * Images
 */
const FullSizeImageWrapper = styled.figure(() => [
    tw`overflow-hidden`,
    tw`mb-[90px] lg:h-[546px] lg:w-[820px]`,
]);

const TwoImagesWrapper = styled.figure(() => [
    tw`grid grid-flow-col grid-cols-2 gap-6 overflow-hidden`,
    tw`mb-[90px] h-[220px] lg:h-[562px] lg:w-[820px]`,
]);

/**
 * Pagination
 */
const Controls = styled.div(() => [
    tw`relative z-10 content-end justify-end hidden ml-auto lg:flex`,
    tw`top-[-70px]`,
]);

const Button = styled.button(() => [
    tw`flex-row cursor-pointer select-none lg:prose-16 lg:leading-5`,
    css`
        &:last-child {
            margin-left: 40px;
        }
    `,
]);

const PrevIconStyled = styled(PrevIcon)(() => [
    tw`inline-block mr-4 text-center transform rotate-90`,
]);

const NextIconStyled = styled(NextIcon)(() => [
    tw`inline-block ml-4 text-center transform rotate-90`,
]);

const DeviceMockupWrapper = styled.div(() => [tw`mb-[40px] lg:mb-[80px]`]);

const sectionLoader = (
    elements: ProjectSection["elements"],
    gallerySliderElementsGap: number = 0,
    projectsByCategory: ProjectsByCategory | null = null
) =>
    elements.map(
        (
            {
                element,
                description = "",
                image = "",
                images = [],
                quote = "",
                type = "",
                link = "",
                list = [],
                content = [],
                stats = [],
            },
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
                                    key={index}
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
                                {images.map(({ image: img }, j) => (
                                    <ParallaxBackground
                                        key={index + String(j)}
                                        bgImgUrl={`${img}`}
                                        contain={true}
                                        scaleOnHover={true}
                                    />
                                ))}
                            </TwoImagesWrapper>
                        </ContentContainer>
                    );

                case "full-page-image":
                    return (
                        <FullPageContent key={index} widthPct={100}>
                            <ParallaxBackground
                                key={index}
                                bgImgUrl={`${image}`}
                            />
                        </FullPageContent>
                    );

                case "slider":
                    return (
                        <GallerySlider
                            key={index}
                            images={images}
                            gap={gallerySliderElementsGap}
                        />
                    );

                case "quote":
                    return (
                        <ContentContainer variant="full" key={index}>
                            <Quote>{quote}</Quote>
                        </ContentContainer>
                    );

                case "device":
                    return (
                        <ContentContainer variant="full" key={index}>
                            <DeviceMockupWrapper>
                                <DeviceMockup
                                    key={index}
                                    type={type}
                                    link={link}
                                />
                            </DeviceMockupWrapper>
                        </ContentContainer>
                    );

                case "devices":
                    return <DevicesCarousel key={index} list={list} />;

                case "stats":
                    const [refStats, animateStats] = useIncrementStats();

                    return (
                        <ContentContainer variant="full" key={index}>
                            <TableStats ref={refStats}>
                                {stats.map(({ title, stat }, j) => (
                                    <SingleStat
                                        key={`stat-${index}-${j}`}
                                        className={j < 3 ? "space" : "big"}
                                    >
                                        <CellTitle>
                                            <StyledNumber
                                                value={stat}
                                                animate={animateStats}
                                            />
                                        </CellTitle>
                                        <StatsCaption>{title}</StatsCaption>
                                    </SingleStat>
                                ))}
                            </TableStats>
                        </ContentContainer>
                    );

                case "credits":
                    return (
                        <ContentContainer variant="full" key={index}>
                            <TableCredits>
                                {content.map(({ title, text }, j) => (
                                    <Fragment key={`credits-${index}-${j}`}>
                                        <CellTitle>{title}</CellTitle>
                                        <div>{text}</div>
                                    </Fragment>
                                ))}
                            </TableCredits>
                        </ContentContainer>
                    );

                case "other-projects":
                    return (
                        <ContentContainer variant="full" key={index}>
                            <OtherProjects
                                key={index}
                                projectsByCategory={
                                    projectsByCategory as ProjectsByCategory
                                }
                            />
                        </ContentContainer>
                    );

                default:
                    return "";
            }
        }
    );

export default function Project({ data }: Props) {
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
    const gallerySliderElementsGap = hasSmallWindowWidth ? 30 : 40;

    const [navigation] = usePagination({ projectsByCategory, uid });

    const [activeItemId, intersection, options, onTimelineItemChange] =
        useTimelineViewport();

    const intersectionRootMargins = ["0px 0px 100% 0px"];

    const timelineWithSections = {
        title: "Design Process",
        id: "singleProject",
        items: sections
            .filter(
                ({ showInTimeline }) =>
                    showInTimeline && showInTimeline === "yes"
            )

            .map(({ section }, i) => {
                if (i > 0) {
                    intersectionRootMargins.push("0px 0px -200px 0px");
                }

                return {
                    id: section.toLowerCase(),
                    title: section,
                };
            }),
    };

    // Last item needs different intersection so to include the footer
    intersectionRootMargins.pop();

    intersectionRootMargins.push("200% 0px 0px 0px");

    const intersectionRefs = [] as any[];

    for (const rootMargin of intersectionRootMargins) {
        intersectionRefs.push(
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useInViewEffect(intersection, {
                ...options,
                rootMargin,
            })
        );
    }

    return (
        <Fragment>
            <MotionCursor />

            <ViewOnDeskStar />

            <MainSection topPadding={true}>
                <HeroWrapper>
                    <MainTitleWrapper>
                        <MainTitle data-text={name}>{name}</MainTitle>
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
                        activeSectionId={timelineWithSections.id}
                        onTimelineItemChange={onTimelineItemChange}
                        sections={[timelineWithSections]}
                    />
                </TimelineWrapper>

                <Tabs
                    hideForDesktop={true}
                    onTabChange={onTimelineItemChange}
                    tabs={timelineWithSections.items}
                    activeTabId={activeItemId}
                />

                {sections.map(({ section, elements, showSectionTitle }, i) => {
                    const sectionId = section
                        .toLowerCase()
                        .replaceAll(" ", "-")
                        .replaceAll("/", "-");

                    return (
                        <ArticleSection
                            key={sectionId}
                            id={sectionId}
                            ref={intersectionRefs[i]}
                        >
                            {showSectionTitle && showSectionTitle === "yes" ? (
                                <H2>{section}</H2>
                            ) : (
                                ""
                            )}
                            {sectionLoader(
                                elements,
                                gallerySliderElementsGap,
                                projectsByCategory
                            )}
                        </ArticleSection>
                    );
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

export const Head = (
    props: HeadProps<Record<string, unknown>, { name: string }>
) => <Meta title={`${props.pageContext?.name || "Project"} - Aga Chainska`} />;
