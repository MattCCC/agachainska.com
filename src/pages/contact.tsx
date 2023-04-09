import { GetStaticProps } from "next";
import tw, { css, styled } from "twin.macro";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Button } from "components/button";
import { MainContainer } from "components/main-container";
import { Meta } from "components/meta";
import { SocialMedia } from "components/social-media";
import { TextTextarea } from "components/text-textarea";
import { socialMedia } from "data/social-media";
import ContactIllustration from "svg/Contact.svg";
import { up } from "utils/screens";

const H1 = styled.div(() => [
    tw`pt-12 mb-5 leading-9 lg:mb-12 font-fbold prose-28 lg:prose-48 lg:leading-14 lg:pt-24`,
]);

const EmailLink = styled.a(() => [tw`inline-block ml-1 text-green`]);

const ContactIllus = styled(ContactIllustration)(() => [
    tw`absolute z-10`,
    css`
        width: 36px;
        height: 36px;
        left: 57px;
        top: 82px;

        ${up("lg")} {
            width: 100px;
            height: 100px;
            left: 330px;
            top: 100px;
        }
    `,
]);

const EMAIL_ADDRESS = "helloagachainska@gmail.com";

export default function Contact() {
    return (
        <>
            <Meta title="Contact - Aga Chainska" />
            <form
                action="https://formsubmit.co/a.chainska@gmail.com"
                method="POST"
                className="pb-52 lg:pb-16"
            >
                <MainContainer topPadding={true} as="section">
                    <ContactIllus />
                    <div tw="col-start-1 col-end-13 lg:col-end-6">
                        <H1>
                            Let’s talk! Shoot me a message if you’d like to work
                            together or just to say hello.
                        </H1>
                        <div className="hidden lg:block">
                            <SocialMedia items={socialMedia} variant="big" />
                        </div>
                    </div>
                    <div tw="col-start-1 lg:col-start-7 col-end-13 lg:col-end-12 lg:pt-24">
                        <TextTextarea
                            id="contact"
                            name="contact"
                            label="Your message"
                            required={true}
                        />
                        <div className="grid mb-10 lg:grid-cols-2 gap-7 mt-7">
                            <div>
                                <TextTextarea
                                    as="input"
                                    id="name"
                                    name="name"
                                    type="text"
                                    label="Your name"
                                    required={true}
                                />
                            </div>
                            <div>
                                <TextTextarea
                                    as="input"
                                    id="email"
                                    name="email"
                                    type="email"
                                    label="Your email"
                                    required={true}
                                />
                            </div>
                        </div>
                        <Button type="submit">Send</Button>
                        <span className="block mt-6 lg:inline-block lg:mt-0 lg:ml-6">
                            or find me at
                            <EmailLink href={`mailto:${EMAIL_ADDRESS}`}>
                                {EMAIL_ADDRESS}
                            </EmailLink>
                        </span>
                    </div>
                </MainContainer>
            </form>
        </>
    );
}

export const getStaticProps: GetStaticProps = async ({ locale = "en" }) => ({
    props: {
        ...(await serverSideTranslations(locale)),
    },
});
