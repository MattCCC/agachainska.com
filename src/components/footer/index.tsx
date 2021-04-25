import tw, { css, styled } from "twin.macro";

import { Contact } from "@components/footer/contact";
import { SocialMedia } from "@components/footer/social-media";
import { socialMedia } from "@data/social-media";
import { useStoreProp } from "@store/index";
import { up } from "@utils/screens";

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
    tw`flex items-center flex-row border-t border-white w-full`,
    css`
        height: 70px;

        ${up("lg")} {
            height: 120px;
        }
    `,
]);

const FooterNav = styled.nav(() => [
    tw`flex items-center flex-row w-full justify-between`,
    css`
        height: 70px;

        ${up("lg")} {
            height: 120px;
        }
    `,
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

export function Footer(): JSX.Element {
    const [showFooter] = useStoreProp("showFooter");

    return (
        <FooterWrapper showFooter={showFooter}>
            <Contact />
            <BottomFooter>
                <FooterContainer>
                    <FooterNav>
                        <BackToTop>Back to top</BackToTop>
                        <SocialMedia items={socialMedia} />
                    </FooterNav>
                </FooterContainer>
            </BottomFooter>
        </FooterWrapper>
    );
}
