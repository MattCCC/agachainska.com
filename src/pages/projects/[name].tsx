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
import dataProjects from "data/projects.yml";
import { GallerySlider } from "domain/single-project/gallery-slider";
import { OtherProjects } from "domain/single-project/other-projects";
import { usePagination } from "domain/single-project/use-pagination";
import {
    ProjectsByCategory,
    useProjectsByCategory,
} from "hooks/use-projects-by-category";
import { useTimelineViewport } from "hooks/use-timeline-viewport";
import { useWindowSize } from "hooks/use-window-size";
import PrevIcon from "svg/down.svg";
import NextIcon from "svg/up.svg";
import { thresholdArray } from "utils/threshold-array";
import dynamic from "next/dynamic";
import { Stats } from "components/project/stats-table";

interface Props {
    project: Project;
    projects: Project[];
}
interface ContentContainerProps {
    variant?: string;
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

const H2Span = styled.span(tw`inline-block w-[50%] lg:leading-[62px]`);

const MainTitle = styled(MainTitleBottom)(() => [
    tw`uppercase bg-project-title-gradient lg:bg-project-title-gradient-lg`,
    tw`text-[70px] leading-[70px] top-[-27px] mb-[-27px] lg:top-[-46px] lg:mb-[-46px] lg:text-[120px] lg:leading-[130px]`,
]);

const Paragraph = styled.p(() => [tw`mb-[40px]`]);

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
    tw`mb-[90px] lg:h-[546px] lg:w-[820px]`,
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
    elements: ProjectSection["elements"],
    gallerySliderElementsGap: number = 0,
    projectsByCategory: ProjectsByCategory | null = null
) =>
    elements.map(
        (
            {
                element,
                title = "",
                description = "",
                image = "",
                quote = "",
                type = "",
                link = "",
                images = [],
                list = [],
                content = [],
                stats = [],
            },
            index
        ) => {
            switch (element) {
                case "text":
                    return (
                        <ContentContainer key={index}>
                            <H3>{title}</H3>
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
                    return (
                        <ContentContainer variant="full" key={index}>
                            <Stats stats={stats} index={index} />
                        </ContentContainer>
                    );

                case "credits":
                    return (
                        <ContentContainer variant="full" key={index}>
                            <CreditsTable>
                                {content.map(
                                    ({ title: creditsTitle, text }, j) => (
                                        <Fragment key={`credits-${index}-${j}`}>
                                            <CellTitle>
                                                {creditsTitle}
                                            </CellTitle>
                                            <div>{text}</div>
                                        </Fragment>
                                    )
                                )}
                            </CreditsTable>
                        </ContentContainer>
                    );

                case "other-projects":
                    return (
                        <ContentContainer variant="full" key={index}>
                            <SeeAllProjectsLinkDesktopContainer>
                                <SeeAllProjectsLink screenSize="lg" />
                            </SeeAllProjectsLinkDesktopContainer>
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

export default function Project({ project, projects }: Props) {
    const {
        uid,
        name,
        cover,
        category,
        timelineTitle = "",
        keyInfo,
        sections = [],
    } = project || {};

    const [projectsByCategory] = useProjectsByCategory({ category, projects });

    const windowSize = useWindowSize();
    const [_hasSmallWindowWidth, setWindowWidth] = useState(false);
    const [gallerySliderElementsGap, setGallerySliderElementsGap] =
        useState(30);

    useEffect(() => {
        const isSmallScreen = windowSize.width < 1024;

        setWindowWidth(isSmallScreen);
        setGallerySliderElementsGap(isSmallScreen ? 30 : 40);
    }, [windowSize]);

    const [navigation] = usePagination({ projectsByCategory, uid });

    const [
        activeItemId,
        intersectionCallback,
        _observerSettings,
        onTimelineItemChange,
    ] = useTimelineViewport();

    const timelineItems = useMemo(() => {
        const filteredSections = sections
            .filter(({ showInTimeline }) => {
                const isShownInTimeline =
                    showInTimeline && showInTimeline === "yes";

                return isShownInTimeline;
            })
            .map(({ section }) => ({
                id: section.toLowerCase(),
                title: section,
            }));

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

            <ViewOnDeskStar />

            <MainSection topPadding={true}>
                <HeroWrapper>
                    <MainTitleWrapper>
                        <MainTitle data-text={name}>{name}</MainTitle>
                    </MainTitleWrapper>
                    <ParallaxBackground bgImgUrl={cover} />
                </HeroWrapper>

                <div tw="col-start-1 lg:col-start-2 col-end-13 lg:col-end-12">
                    {(navigation.hasPreviousButton ||
                        navigation.hasNextButton) && (
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

                    {keyInfo && keyInfo.elements && (
                        <KeyInfoTable>
                            {(keyInfo.elements || []).map(
                                ({ title, text }, j) => (
                                    <div tw="mb-4" key={j}>
                                        <CellTitle>{title}</CellTitle>
                                        <div>{text}</div>
                                    </div>
                                )
                            )}
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

                {sections.map(
                    (
                        { section, elements, showSectionTitle, showInTimeline },
                        i
                    ) => {
                        const sectionId = section
                            .toLowerCase()
                            .replaceAll(" ", "-")
                            .replaceAll("/", "-");

                        return (
                            <div key={sectionId}>
                                {showInTimeline && showInTimeline === "yes" ? (
                                    <SectionObserver
                                        sectionId={sectionId}
                                        sectionNumber={i}
                                        isLastSection={
                                            section ===
                                            timelineItems[numItems - 1].title
                                        }
                                        intersectionCallback={
                                            intersectionCallback
                                        }
                                    >
                                        {showSectionTitle &&
                                            showSectionTitle === "yes" && (
                                                <H2>
                                                    <H2Span>{section}</H2Span>
                                                </H2>
                                            )}
                                        {elements &&
                                            sectionLoader(
                                                elements,
                                                gallerySliderElementsGap,
                                                projectsByCategory
                                            )}
                                    </SectionObserver>
                                ) : (
                                    <ArticleSection id={sectionId}>
                                        {showSectionTitle &&
                                            showSectionTitle === "yes" && (
                                                <H2>
                                                    <H2Span>{section}</H2Span>
                                                </H2>
                                            )}
                                        {elements &&
                                            sectionLoader(
                                                elements,
                                                gallerySliderElementsGap,
                                                projectsByCategory
                                            )}
                                    </ArticleSection>
                                )}
                            </div>
                        );
                    }
                )}
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

export async function getStaticPaths() {
    const paths = dataProjects.map((currProject: Project) => ({
        params: { name: currProject.name },
    }));

    return {
        paths,
        fallback: true,
    };
}

export const getStaticProps: GetStaticProps<Props> = async ({
    params,
    locale = "en",
}) => {
    const name = params?.name;

    const project =
        dataProjects.find(
            (currProject: Project) =>
                String(currProject.nameSlug) === "/projects/" + name
        ) || {};

    return {
        props: {
            project,
            projects: dataProjects,
            ...(await serverSideTranslations(locale)),
        },
    };
};
