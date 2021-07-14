import { Fragment } from "react";

import tw, { css, styled } from "twin.macro";

import { GridRow, MainContainer } from "@components/main-container";
import PersonalPic from "@components/personal-pic";
import { SocialMedia } from "@components/social-media";
import { socialMedia } from "@data/social-media";
import {up} from "@utils/screens";


const HeroSection = styled.section(() => [
    tw`relative lg:grid lg:grid-cols-12 lg:gap-7`,
    css`
        margin-top: 110px;

        ${up("lg")} {
            align-items: center;
            margin-top: 0;
            height: 100vh;
        }
    `
]);

const Info = styled.div(() => [
    tw`lg:col-start-5 lg:col-end-11 lg:flex lg:flex-col lg:justify-between`,
    css`
        ${up("lg")} {
            height: 386px;
            padding-top: 10px
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
                                    <SocialMedia items={socialMedia} variant="normal"/>
                                </SocialMediaLinksCon>
                            </Info>
                    </HeroSection>
                </GridRow>
            </MainContainer>
        </Fragment>
    );
}
