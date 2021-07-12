import { Fragment } from "react";

import tw, { css, styled } from "twin.macro";

import { GridRow, MainContainer } from "@components/main-container";
import { SocialMedia } from "@components/social-media";
import { socialMedia } from "@data/social-media";


import personalPic from "../img/personal-pic-rectangle.png";
import personalPictureWhiteBackground from "../svg/personal-pic-bg-black&white-mobile.svg";
import personalPictureBlackBackground from "../svg/personal-pic-bg-black-mobile.svg";


const HeroSection = styled.section(() => [
    tw`relative`,
    css`
        margin-top: 110px;
    `
]);

const PersonalPic = styled.div(() => [
    css`
        width: 157px;
        height: 157px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url(${personalPictureBlackBackground}) no-repeat;
        background-size: contain;
        position: relative;
        margin-bottom: 32px;

        img {
            width: 149px;
            height: 149px;
        }

        &:after {
            content: url(${personalPictureWhiteBackground});
            position: absolute;
            top: 59%;
            left: 56%;
            transform: translate(-50%, -50%);
            z-index: -1;
        }

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
                    {/* TODO: Replace with a component that returns the personal image based on screen size (Mobile or Desktop) */}
                        <PersonalPic>
                            <img src={personalPic} alt="Aga" />
                        </PersonalPic>
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
