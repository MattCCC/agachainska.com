import { useCallback } from "react";

import tw, { css, styled } from "twin.macro";

import { Contact } from "@components/footer/contact";
import { SocialMedia } from "@components/footer/social-media";
import { socialMedia } from "@data/social-media";
import { useStoreProp } from "@store/index";
import { ReactComponent as WavesPattern } from "@svg/bg-lines.svg";
import { ReactComponent as PricklyPearIllustration } from "@svg/Prickly pear@1x.svg";
import { up } from "@utils/screens";
import { scrollTo } from "@utils/scroll-to";

interface Props {
    showFooter: boolean;
}

const FooterWrapper = styled.footer(({ showFooter = true }: Props) => [
    tw`fixed bottom-0 w-full z-0`,
    css`
        background: rgba(0, 0, 0, 0.95);
    `,
    !showFooter && tw`hidden`,
]);

const FooterContainer = styled.div(() => [
    tw`flex mx-auto w-full h-full`,
    css`
        max-width: 1213px;
        left: 15px;
        right: 15px;
    `,
]);

const BottomFooter = styled.div(() => [
    tw`border-t border-white w-full`,
    css`
        height: 70px;

        ${up("lg")} {
            height: 120px;
        }
    `,
]);

const FooterNav = styled.nav(() => [
    tw`flex items-center flex-row w-full justify-between`,
]);

const BackToTop = styled.div(() => [
    tw`text-white prose-16px select-none`,
    css`
        line-height: 70px;

        ${up("lg")} {
            line-height: 120px;
        }
    `,
]);

const Waves = styled(WavesPattern)(() => [
    tw`absolute w-full h-full opacity-5`,
]);

const PricklyPear = styled(PricklyPearIllustration)(() => [
    tw`absolute z-10`,
    css`
        width: 100px;
        height: 100px;
        left: 48%;
        top: 129px;
    `,
]);

export function Footer(): JSX.Element {
    const [showFooter] = useStoreProp("showFooter");
    const onBackToTopClicked = useCallback((): void => {
        scrollTo();
    }, []);

    return (
        <FooterWrapper showFooter={showFooter}>
            <Waves />
            <PricklyPear />
            <Contact />
            <BottomFooter>
                <FooterContainer>
                    <FooterNav>
                        <a href="#top" onClick={onBackToTopClicked}>
                            <BackToTop>Back to top</BackToTop>
                        </a>
                        <SocialMedia items={socialMedia} />
                    </FooterNav>
                </FooterContainer>
            </BottomFooter>
        </FooterWrapper>
    );
}
