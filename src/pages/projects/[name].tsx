import {
    Fragment,
    PropsWithChildren,
    useEffect,
    useMemo,
    useState,
} from "react";

import { GetStaticProps } from "next";
import { useInViewEffect } from "react-hook-inview";
import tw, { css, styled } from "twin.macro";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { TinaMarkdown } from "tinacms/dist/rich-text";

import { DeviceMockup } from "components/device-mockup";
import { DevicesCarousel } from "components/devices-carousel";
import { FullPageContent } from "components/full-page-content";
import { H2 } from "components/h2";
import { H3 } from "components/h3";
import { Link } from "components/link";
import { MainContainer } from "components/main-container";
import { MainTitleBottom } from "components/main-title";
import { Meta } from "components/meta";
import { MotionCursor } from "components/motion-cursor";
import { ParallaxBackground } from "components/parallax-background";
import { Quote } from "components/quote";
import SeeAllProjectsLink from "components/see-all-projects-link";
import { Tabs } from "components/tabs";
import ViewOnDeskStar from "components/view-on-desktop-star";
import { GallerySlider } from "domain/single-project/gallery-slider";
import { OtherProjects } from "domain/single-project/other-projects";
import { usePagination } from "domain/single-project/use-pagination";
import { useProjectsByCategory } from "hooks/use-projects-by-category";
import { useTimelineViewport } from "hooks/use-timeline-viewport";
import { useWindowSize } from "hooks/use-window-size";
import PrevIcon from "svg/down.svg";
import NextIcon from "svg/up.svg";
import { thresholdArray } from "utils/threshold-array";
import dynamic from "next/dynamic";
import { Stats } from "components/project/stats-table";
import { ProjectQueryVariables, ProjectQuery } from "tina/__generated__/types";
import client from "tina/__generated__/client";
import {
    Project as ProjectData,
    ProjectNode,
    ProjectSectionsElement,
} from "types/project";
import { HTMLInline } from "components/tina-render-html";
import { useStoreProp } from "store/index";

interface ContentContainerProps {
    variant?: string;
}

interface ProjectQueryWrapper {
    data: ProjectQuery;
    query: string;
    variables: ProjectQueryVariables;
}

interface Props {
    project: ProjectQuery["project"];
    projects: Array<ProjectQuery["project"]>;
}

const MainSection = styled(MainContainer).withConfig({
    shouldForwardProp: () => true,
})(() => [tw`absolute z-10 col-start-2 col-end-13`]);

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

const H2Span = styled.span(tw`block pt-16 -mt-16 w-[50%] lg:leading-[62px]`);

const MainTitle = styled(MainTitleBottom)(() => [
    tw`uppercase bg-project-title-gradient lg:bg-project-title-gradient-lg`,
    tw`text-[70px] leading-[70px] top-[-27px] mb-[-27px] lg:top-[-46px] lg:mb-[-46px] lg:text-[120px] lg:leading-[130px]`,
]);

const ParagraphWrapper = styled.div(() => [
    tw`mb-[40px]`,
    css`
        p {
            ${tw`mb-4`}
        }
    `,
]);

const HeroWrapper = styled.div(() => [
    tw`relative w-full col-start-1 col-end-13 lg:col-start-2 lg:col-end-12`,
    tw`mb-[70px] h-[200px] sm:h-[320px] md:h-[390px] lg:h-[462px] lg:mb-[90px]`,
]);

const KeyInfoTable = styled.div(() => [
    tw`grid max-w-full grid-flow-row grid-cols-1 lg:grid-cols-2`,
    tw`w-[820px] leading-[24px]`,
]);

const CreditsTable = styled.div(() => [
    tw`grid max-w-full grid-flow-row grid-cols-1 grid-rows-2 lg:grid-cols-3 lg:grid-flow-col`,
    tw`w-[820px] leading-[24px]`,
]);

const CellTitle = styled.div(() => [tw`font-fbold`, tw`mt-[12px]`]);

const Article = styled.article(() => [tw`relative`]);

const ArticleSection = styled.section(() => [
    tw`relative z-10 mx-auto`,
    tw`max-w-[1069px] px-[15px] pb-[1px]`,
]);

const TimelineWrapper = styled.aside(() => [
    tw`sticky top-0 right-0 z-20 hidden ml-auto lg:block lg:col-start-11`,
    tw`w-[220px] mr-[84px] translate-y-[90px]`,
]);

const FullSizeImageWrapper = styled.figure(() => [
    tw`overflow-hidden`,
    tw`mb-[90px] lg:w-[820px]`,
]);

const TwoImagesWrapper = styled.figure(() => [
    tw`grid grid-flow-col grid-cols-2 gap-6 overflow-hidden`,
    tw`mb-[90px] h-[220px] lg:h-[562px] lg:w-[820px]`,
]);

const PaginationControls = styled.div(() => [
    tw`relative z-10 content-end justify-end hidden ml-auto lg:flex`,
    tw`top-[-70px]`,
]);

const PaginationButton = styled.button(() => [
    tw`flex-row cursor-pointer select-none lg:prose-16 lg:leading-5`,
    css`
        &:last-child {
            margin-left: 40px;
        }
    `,
]);

const SeeAllProjectsLinkDesktopContainer = styled.div(() => [
    tw`flex justify-end mb-32 -mt-32`,
]);

const PrevIconStyled = styled(PrevIcon)(() => [
    tw`inline-block mr-4 text-center transform rotate-90`,
]);

const NextIconStyled = styled(NextIcon)(() => [
    tw`inline-block ml-4 text-center transform rotate-90`,
]);

const DeviceMockupWrapper = styled.div(() => [tw`mb-[40px] lg:mb-[80px]`]);

const TimelineNoSSR = dynamic(() => import("../../components/timeline"), {
    ssr: false,
});

const sectionLoader = (
    elements: ProjectSectionsElement[],
    gallerySliderElementsGap: number = 0,
    otherProjects: ProjectData[] | null = null
) =>
    elements?.map((el, index) => {
        if (!el) {
            return null;
        }

        const element = el.__typename;

        switch (element) {
            case "ProjectSectionsElementsText":
                return (
                    <ContentContainer key={index}>
                        <H3>{el.title}</H3>
                        <ParagraphWrapper>
                            <TinaMarkdown
                                components={HTMLInline}
                                content={el.content}
                            />
                        </ParagraphWrapper>
                    </ContentContainer>
                );

            case "ProjectSectionsElementsImages":
                if (!el.images || !el.images[0]) {
                    return null;
                }

                if (el.images.length === 1) {
                    if (el.images[0].fullPageImage) {
                        return (
                            <FullPageContent key={index} widthPct={100}>
                                <ParallaxBackground
                                    key={index}
                                    bgImgUrl={`${el.images[0].image}`}
                                    width={
                                        typeof window !== "undefined"
                                            ? window.innerWidth
                                            : 1920
                                    }
                                />
                            </FullPageContent>
                        );
                    }

                    return (
                        <ContentContainer key={index}>
                            <FullSizeImageWrapper>
                                <ParallaxBackground
                                    key={index}
                                    bgImgUrl={`${el.images[0].image}`}
                                    contain={true}
                                    width={820}
                                />
                            </FullSizeImageWrapper>
                        </ContentContainer>
                    );
                }

                return (
                    <ContentContainer key={index}>
                        <TwoImagesWrapper>
                            {el.images.map((imgObj, j) => (
                                <ParallaxBackground
                                    key={index + String(j)}
                                    bgImgUrl={`${imgObj?.image}`}
                                    contain={true}
                                    width={410}
                                />
                            ))}
                        </TwoImagesWrapper>
                    </ContentContainer>
                );

            case "ProjectSectionsElementsSlider":
                if (!el.sliderImages || !el.sliderImages[0]) {
                    return null;
                }

                return (
                    <GallerySlider
                        key={index}
                        images={el.sliderImages}
                        gap={gallerySliderElementsGap}
                    />
                );

            case "ProjectSectionsElementsQuote":
                return (
                    <ContentContainer variant="full" key={index}>
                        <Quote>
                            <TinaMarkdown
                                components={HTMLInline}
                                content={el.quote}
                            />
                        </Quote>
                    </ContentContainer>
                );

            case "ProjectSectionsElementsDevice":
                return (
                    <ContentContainer variant="full" key={index}>
                        <DeviceMockupWrapper>
                            <DeviceMockup
                                key={index}
                                type={el.type}
                                link={el.link}
                            />
                        </DeviceMockupWrapper>
                    </ContentContainer>
                );

            case "ProjectSectionsElementsDevices":
                return <DevicesCarousel key={index} list={el.devices} />;

            case "ProjectSectionsElementsStatistics":
                if (!el.stats || !el.stats.length) {
                    return null;
                }

                return (
                    <ContentContainer variant="full" key={index}>
                        <Stats stats={el.stats} index={index} />
                    </ContentContainer>
                );

            case "ProjectSectionsElementsCredits":
                return (
                    <ContentContainer variant="full" key={index}>
                        <CreditsTable>
                            {(el?.credits || []).map((credit, j) => {
                                if (!credit) {
                                    return null;
                                }

                                return (
                                    <Fragment key={`credits-${index}-${j}`}>
                                        <CellTitle>{credit.title}</CellTitle>
                                        <div>{credit.text}</div>
                                    </Fragment>
                                );
                            })}
                        </CreditsTable>
                    </ContentContainer>
                );

            case "ProjectSectionsElementsProjects":
                return (
                    <ContentContainer variant="full" key={index}>
                        <SeeAllProjectsLinkDesktopContainer>
                            <SeeAllProjectsLink screenSize="lg" />
                        </SeeAllProjectsLinkDesktopContainer>
                        <OtherProjects
                            key={index}
                            otherProjects={otherProjects}
                            limit={el.limit || 4}
                        />
                    </ContentContainer>
                );

            default:
                return null;
        }
    });

export default function Project({ project, projects }: Props) {
    const {
        id: uid,
        name,
        cover,
        category,
        timelineTitle = "",
        keyInfo,
        _sys,
        projectPageColor = "",
        sections = [],
    } = project || {};

    const [, dispatchBgColor] = useStoreProp("projectPageBackgroundColor");

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatchBgColor.setProjectPageBackgroundColor(
                String(projectPageColor || "")
            );
        }, 0);

        return () => {
            clearTimeout(timer);
        };
    }, [dispatchBgColor, projectPageColor]);

    const [otherProjects, filteredProjects] = useProjectsByCategory({
        category,
        projects,
        nameSlug: _sys.filename,
    });

    const windowSize = useWindowSize();
    const [_hasSmallWindowWidth, setWindowWidth] = useState(false);
    const [gallerySliderElementsGap, setGallerySliderElementsGap] =
        useState(30);

    useEffect(() => {
        const isSmallScreen = windowSize.width < 1024;

        setWindowWidth(isSmallScreen);
        setGallerySliderElementsGap(isSmallScreen ? 30 : 40);
    }, [windowSize]);

    const [navigation] = usePagination({ projects: filteredProjects, uid });

    const [
        activeItemId,
        intersectionCallback,
        _observerSettings,
        onTimelineItemChange,
    ] = useTimelineViewport();

    const timelineItems = useMemo(() => {
        if (!sections) {
            return [];
        }

        const filteredSections = sections
            .filter((section) => section !== null && section.showInTimeline)
            .map((section) =>
                section
                    ? {
                          id: section.title.toLowerCase(),
                          title: section.title,
                      }
                    : { id: "", title: "" }
            );

        return filteredSections;
    }, [sections]);

    const timelineSection = {
        title: timelineTitle || "",
        id: "singleProject",
        items: timelineItems,
    };

    const numItems = timelineItems.length;

    return (
        <Fragment>
            <Meta title={`${name || "Project"} · Aga Chainska`} />

            <MotionCursor />

            <MainSection topPadding={true}>
                <HeroWrapper>
                    <ViewOnDeskStar />
                    <MainTitleWrapper>
                        <MainTitle data-text={name}>{name}</MainTitle>
                    </MainTitleWrapper>
                    <ParallaxBackground bgImgUrl={cover} width={1028} />
                </HeroWrapper>

                <div tw="col-start-1 lg:col-start-2 col-end-13 lg:col-end-12">
                    {(navigation?.hasPreviousButton ||
                        navigation?.hasNextButton) && (
                        <PaginationControls>
                            {navigation.hasPreviousButton && (
                                <Link to={navigation.previousTo}>
                                    <PaginationButton>
                                        <PrevIconStyled /> Previous
                                    </PaginationButton>
                                </Link>
                            )}
                            {navigation.hasNextButton && (
                                <Link to={navigation.nextTo}>
                                    <PaginationButton>
                                        Next <NextIconStyled />
                                    </PaginationButton>
                                </Link>
                            )}
                        </PaginationControls>
                    )}

                    {keyInfo && keyInfo.length && (
                        <KeyInfoTable>
                            {keyInfo.map((info, j) => (
                                <div tw="mb-4" key={j}>
                                    <CellTitle>{info?.title || ""}</CellTitle>
                                    <div>{info?.text || ""}</div>
                                </div>
                            ))}
                        </KeyInfoTable>
                    )}
                </div>
            </MainSection>

            <Article>
                {!!numItems && (
                    <Fragment>
                        <TimelineWrapper
                            style={{
                                marginBottom: "-" + 84.66 * numItems + "px",
                            }}
                        >
                            <TimelineNoSSR
                                style={{
                                    height: 84.66 * numItems + "px",
                                }}
                                activeItemId={activeItemId}
                                activeSectionId={timelineSection.id}
                                onTimelineItemChange={onTimelineItemChange}
                                sections={[timelineSection]}
                            />
                        </TimelineWrapper>

                        <Tabs
                            hideForDesktop={true}
                            onTabChange={onTimelineItemChange}
                            tabs={timelineItems}
                            activeTabId={activeItemId}
                        />
                    </Fragment>
                )}

                {sections &&
                    sections.map((section, i) => {
                        if (!section) {
                            return null;
                        }

                        const sectionName = section.title;
                        const sectionId = sectionName
                            .toLowerCase()
                            .replaceAll(" ", "-")
                            .replaceAll("/", "-");

                        return (
                            <div key={sectionId}>
                                {section.showInTimeline ? (
                                    <SectionObserver
                                        sectionId={sectionId}
                                        sectionNumber={i}
                                        isLastSection={
                                            sectionName ===
                                            timelineItems[numItems - 1]?.title
                                        }
                                        intersectionCallback={
                                            intersectionCallback
                                        }
                                    >
                                        {section.showSectionTitle && (
                                            <H2>
                                                <H2Span>{sectionName}</H2Span>
                                            </H2>
                                        )}
                                        {sectionLoader(
                                            section.elements || [],
                                            gallerySliderElementsGap,
                                            otherProjects
                                        )}
                                    </SectionObserver>
                                ) : (
                                    <ArticleSection id={sectionId}>
                                        {section.showSectionTitle && (
                                            <H2>
                                                <H2Span>{sectionName}</H2Span>
                                            </H2>
                                        )}
                                        {sectionLoader(
                                            section.elements || [],
                                            gallerySliderElementsGap,
                                            otherProjects
                                        )}
                                    </ArticleSection>
                                )}
                            </div>
                        );
                    })}
            </Article>
        </Fragment>
    );
}

const intersectionObserverSettings = {
    rootMargin: "0px",
    threshold: thresholdArray(2),
};

const SectionObserver = ({
    sectionNumber,
    sectionId,
    isLastSection = false,
    children,
    intersectionCallback,
}: PropsWithChildren<{
    sectionId: string;
    sectionNumber: number;
    isLastSection: boolean;
    intersectionCallback: IntersectionObserverCallback;
}>) => {
    // First item needs different intersection as it's after the head section
    let rootMargin =
        sectionNumber > 0 ? "0px 0px -200px 0px" : "0px 0px 100% 0px";

    // Last item needs different intersection so to include the footer
    if (isLastSection) {
        rootMargin = "200% 0px 0px 0px";
    }

    const intersectionRef = useInViewEffect(intersectionCallback, {
        ...intersectionObserverSettings,
        rootMargin,
    });

    return (
        <ArticleSection key={sectionId} id={sectionId} ref={intersectionRef}>
            {children}
        </ArticleSection>
    );
};

export const getStaticPaths = async ({ locales = ["en"] }) => {
    const { data } = await client.queries.projectConnection();
    const paths = [] as unknown[];

    if (data.projectConnection.edges) {
        data.projectConnection.edges.forEach((project) => {
            locales.forEach((locale) => {
                paths.push({
                    params: { name: project?.node?._sys.filename },
                    locale,
                });
            });
        });
    }

    return {
        paths,
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps = async ({
    params = { filename: "" },
    locale = "en",
}) => {
    let project = {
        data: {},
        query: "",
        variables: {
            relativePath: `${locale}/${params["name"]}.md`,
        },
    } as ProjectQueryWrapper;

    const projects = [] as ProjectNode[];

    try {
        const { variables, data, query } = await client.queries.project(
            project.variables
        );

        project = { variables, data, query };
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
            project: project.data.project,
            projects,
        },
    };
};
