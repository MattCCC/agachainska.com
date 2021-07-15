import { Fragment } from "react";

import tw, { css, styled } from "twin.macro";

import { GridRow, MainContainer } from "@components/main-container";
import PersonalPic from "@components/personal-pic";
import { SocialMedia } from "@components/social-media";
import { socialMedia } from "@data/social-media";
import { useWindowSize } from "@hooks/use-window-size";
import {up} from "@utils/screens";


const HeroSection = styled.section(() => [
    tw`relative lg:mt-0 lg:grid lg:grid-cols-12 lg:gap-7 lg:items-center lg:h-screen`,
    css`
        margin-top: 110px;
    `
]);

const Info = styled.div(() => [
    tw`lg:col-start-5 lg:col-end-11 lg:pt-2.5 lg:flex lg:flex-col lg:justify-between`,
    css`
        ${up("lg")} {
            height: 386px;
        }
        
    `
]);

const AboutAga = styled.h2(() => [
    tw`prose-24px font-fbold lg:prose-30px`,
]);

const SocialMediaLinksCon = styled.div(() => [
    css`
        margin-top: 32px;    
        a { 
            color: #000;
            border: 1px solid #000;
            
            &:first-child {
                margin-left: 0;
            }
            
            &:hover { 
                background: #000;
                color: #fff;
            }
        }

        ${up("lg")} {
            margin-top: 0;
        }
    `
]);

export default function About(): JSX.Element {
    const windowSize = useWindowSize();

    return (
        <Fragment>
            <MainContainer>
                <GridRow>
                    <HeroSection>
                        <PersonalPic />
                            <Info>
                                <AboutAga>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                    sed do eiusmod tempor incididunt ut labore et dolore magna
                                    aliqua. Adipiscing elit, sed do eiusmod tempor et dolore magna aliqua.
                                </AboutAga>

                                <SocialMediaLinksCon>
                                    <SocialMedia items={socialMedia}
                                        variant={windowSize.width < 1024 ? "normal" : "big"}
                                    />
                                </SocialMediaLinksCon>
                            </Info>
                    </HeroSection>
                </GridRow>
            </MainContainer>
        </Fragment>
    );
}
