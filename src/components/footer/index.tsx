import { useCallback } from "react";

import tw, { css, styled } from "twin.macro";

import { BackgroundNoise } from "@components/background-noise";
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
    tw`relative bottom-0 z-0 w-full overflow-hidden bg-black lg:fixed`,
    !showFooter && tw`hidden`,
]);

const FooterContainer = styled.div(() => [
    tw`flex w-full h-full mx-auto`,
    css`
        max-width: 1213px;
        left: 15px;
        right: 15px;
    `,
]);

const BottomFooter = styled.div(() => [
    tw`relative z-10 w-full border-t border-white`,
    css`
        min-height: 140px;

        ${up("lg")} {
            min-height: 120px;
        }
    `,
]);

const FooterNav = styled.nav(() => [
    tw`flex flex-col items-center justify-between w-full lg:flex-row`,
]);

const BackToTop = styled.div(() => [
    tw`text-white select-none prose-16`,
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
        width: 50px;
        height: 50px;
        left: 45px;
        top: 29px;

        ${up("lg")} {
            width: 100px;
            height: 100px;
            left: 48%;
            top: 129px;
        }
    `,
]);

export function Footer(): JSX.Element {
    const [showFooter] = useStoreProp("showFooter");
    const onBackToTopClicked = useCallback((e): void => {
        scrollTo();
    }, []);

    return (
        <FooterWrapper showFooter={showFooter}>
            <BackgroundNoise />
            <div className="relative">
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
            </div>
        </FooterWrapper>
    );
}
