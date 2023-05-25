import { Fragment, useRef, useState } from "react";

import tw, { css, styled } from "twin.macro";

import { BackgroundNoise } from "components/background-noise";
import { Contact } from "components/footer/contact";
import { SocialMedia } from "components/social-media";
import { useStoreProp } from "store/index";
import { up } from "utils/screens";
import { useScroll, useMotionValueEvent } from "framer-motion";

interface Props {
    showFooter: boolean;
}

const FooterWrapper = styled.footer(({ showFooter = true }: Props) => [
    tw`relative bottom-0 z-0 w-full overflow-hidden bg-black lg:fixed`,
    !showFooter && tw`hidden`,
]);

const MiniFooterWrapper = styled.footer(() => [
    tw`relative bottom-0 z-10 w-full overflow-hidden`,
    css`
        margin-top: -140px;

        ${up("lg")} {
            margin-top: -120px;
        }
    `,
]);

const FooterContainer = styled.div(() => [
    tw`flex w-full h-full mx-auto max-w-screen-2xl`,
    css`
        left: 15px;
        right: 15px;
    `,
]);

const BottomFooter = styled.div(() => [
    tw`relative z-10 w-full border-t border-white`,
    css`
        height: 140px;

        ${up("lg")} {
            height: 120px;
        }
    `,
]);

const FooterNav = styled.nav(() => [
    tw`flex flex-col items-center w-full text-white lg:justify-between lg:flex-row`,
]);

const FooterNavText = styled.div(() => [
    tw`text-white select-none prose-16`,
    css`
        line-height: 70px;

        ${up("lg")} {
            line-height: 120px;
        }
    `,
]);

const Annotation = styled.div(({ showFooter }: Partial<Props>) => [
    tw`container relative z-10 mx-auto text-center my-7 text-primary lg:my-0 lg:text-left`,
    showFooter && tw`text-white bottom-2`,
]);

const AnnotationLink = styled.a(() => [tw`inline-block ml-1 text-green`]);

const MainMarginBottom = 810;

export function Footer() {
    const [showFooter] = useStoreProp("showFooter");
    const [darkTheme] = useStoreProp("darkTheme");
    const [socialMediaData] = useStoreProp("socialMediaData");
    const footerElement = useRef<HTMLElement>(null);

    const { scrollY } = useScroll();
    const [isVisible, setIsVisible] = useState(false);

    useMotionValueEvent(scrollY, "change", (scrollPosition) => {
        const pageHeight =
            document.documentElement.scrollHeight -
            window.innerHeight -
            MainMarginBottom;
        const isFooterVisible = scrollPosition >= pageHeight;

        if (isVisible !== isFooterVisible) {
            setIsVisible(isFooterVisible);
        }
    });

    return (
        <Fragment>
            {showFooter && (
                <FooterWrapper
                    ref={footerElement}
                    showFooter={showFooter && isVisible}
                >
                    {isVisible && <BackgroundNoise />}
                    <div className="relative">
                        <Contact />
                        <BottomFooter>
                            <FooterContainer>
                                <FooterNav>
                                    <Annotation showFooter={showFooter}>
                                        Coded by
                                        <AnnotationLink
                                            href="https://deindesign.pl/"
                                            rel="noreferrer"
                                            target="_blank"
                                        >
                                            Matt
                                        </AnnotationLink>
                                    </Annotation>
                                    <SocialMedia items={socialMediaData} />
                                </FooterNav>
                            </FooterContainer>
                        </BottomFooter>
                    </div>
                </FooterWrapper>
            )}

            {darkTheme && !showFooter && (
                <MiniFooterWrapper>
                    <BottomFooter>
                        <FooterContainer>
                            <FooterNav>
                                <FooterNavText>
                                    Coded by
                                    <AnnotationLink
                                        href="https://deindesign.pl/"
                                        rel="noreferrer"
                                        target="_blank"
                                    >
                                        Matt
                                    </AnnotationLink>
                                </FooterNavText>
                                <SocialMedia items={socialMediaData} />
                            </FooterNav>
                        </FooterContainer>
                    </BottomFooter>
                </MiniFooterWrapper>
            )}
        </Fragment>
    );
}
