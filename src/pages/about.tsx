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

const AboutyStyle = styled.h2(() => [
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

const Article = styled.article(() => [
    tw`relative mb-6`
]);

const ArticleSection = styled.section(() => [
    tw`lg:grid lg:grid-cols-12 lg:grid-rows-1 lg:items-center`,
    css`
        &:first-child {
            margin-top: 165px;
        }

        ${up("lg")} {
            &:first-child {
                margin-top: 0;
            }                
        }
    `
]);

const TitleContainer = styled.div(() => [
    tw`border-b border-black border-solid mb-6 lg:col-start-1 lg:col-end-11 lg:grid lg:grid-cols-12`,
    css`
        padding-bottom: 5px;

        ${up("lg")} {
            padding-bottom: 27px;
        }
    `
]);

const Title = styled.h2(() => [
    tw`prose-30px h-10 font-fbold uppercase -ml-px lg:prose-54px lg:col-start-1 lg:col-end-4 lg:h-auto`
]);

const DetailsContainer = styled.div(() => [
    tw`mb-20 lg:col-start-1 lg:col-end-7`,
    css`
        max-width: 606px;   
    `
]);

const Details = styled.p(() => [
    tw`prose-16 font-base leading-6 mb-10`
]);

const SkillsTable = styled.ul(() => [
    tw`grid grid-cols-2 grid-rows-3 lg:grid-cols-3 lg:grid-rows-2 border-black border-b border-l`
]);

const Skill = styled.li(() => [
    tw`flex items-center justify-center font-fbold text-center uppercase prose-18px lg:prose-20px 
    leading-6 border-black border-t border-r`,
    css`
        height: 78px;
        padding: 8px;

        ${up("lg")} {
            height: 100px;
        }
    `
]);


export default function About(): JSX.Element {
    const windowSize = useWindowSize();
    const hasSmallWindowWidth = windowSize.width < 1024;
    const skillsList = [
        "ux design",
        "ux design",
        "ux design",
        "ui design",
        "responsive design",
        "design systems",
    ];

    return (
        <Fragment>
            <MainContainer>
                <GridRow>
                    <HeroSection>
                        <PersonalPic />
                        <Info>
                            <AboutyStyle>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna
                                aliqua. Adipiscing elit, sed do eiusmod tempor et dolore magna aliqua.
                            </AboutyStyle>

                            <SocialMediaLinksCon>
                                <SocialMedia items={socialMedia}
                                    variant={hasSmallWindowWidth ? "normal" : "big"}
                                />
                            </SocialMediaLinksCon>
                        </Info>
                    </HeroSection>

                    <Article>
                        <ArticleSection id="expertise">
                            <TitleContainer>
                                <Title>
                                    Expertise
                                </Title>
                            </TitleContainer>

                            <DetailsContainer>
                                <Details>
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                                    architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                                    sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
                                    voluptatem sequi nesciunt.
                                </Details>

                                <SkillsTable>
                                    {skillsList.map((element, index) => (
                                        <Skill key={index}>
                                            {element}
                                        </Skill>
                                    ))}
                                </SkillsTable>
                            </DetailsContainer>
                        </ArticleSection>
                    </Article>
                </GridRow>
            </MainContainer>
        </Fragment>
    );
}
