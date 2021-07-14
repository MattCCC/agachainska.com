import { Fragment } from "react";

import tw, { css, styled } from "twin.macro";

import { GridRow, MainContainer } from "@components/main-container";
import PersonalPic from "@components/personal-pic";
import { SocialMedia } from "@components/social-media";
import { socialMedia } from "@data/social-media";


const HeroSection = styled.section(() => [
    tw`relative`,
    css`
        margin-top: 110px;
    `
]);


const AboutAga = styled.h2(() => [
    tw`prose-24 font-black`,
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
    `
]);

export default function About(): JSX.Element {
    return (
        <Fragment>
            <MainContainer>
                <GridRow>
                    <HeroSection>
                        <PersonalPic />
                        <AboutAga>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Adipiscing elit, sed do eiusmod tempor et dolore magna aliqua.</AboutAga>

                            <SocialMediaLinksCon>
                                <SocialMedia items={socialMedia} variant="normal"/>
                            </SocialMediaLinksCon>
                    </HeroSection>
                </GridRow>
            </MainContainer>
        </Fragment>
    );
}
