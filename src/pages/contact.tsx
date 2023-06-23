import { GetStaticProps } from "next";
import tw, { styled } from "twin.macro";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Button } from "components/button";
import { MainContainer } from "components/main-container";
import { Meta } from "components/meta";
import { SocialMedia } from "components/social-media";
import { TextTextarea } from "components/text-textarea";
import ContactIllustration from "svg/Contact.svg";
import client from "tina/__generated__/client";
import { PageQuery, PageQueryVariables } from "tina/__generated__/types";
import { useStoreProp } from "store/index";
import { useEffect } from "react";
import {
    ConfigurationPage,
    fetchSocialMediaData,
} from "queries/fetch-social-media-data";

const H1 = styled.div(() => [
    tw`pt-12 mb-5 leading-9 lg:mb-12 font-fbold prose-28 lg:prose-48 lg:leading-14 lg:pt-24`,
]);

const EmailLink = styled.a(() => [tw`inline-block ml-1 text-green`]);

const ContactIllus = styled(ContactIllustration)(() => [
    tw`absolute z-10 w-[36px] h-[36px] left-[57px] top-[82px]`,
    tw`lg:w-[100px] lg:h-[100px] lg:left-[330px] lg:top-[100px]`,
]);

interface Page {
    data: PageQuery;
    query: string;
    variables: PageQueryVariables;
}

type ContactPage = Extract<
    PageQuery["page"],
    {
        __typename?: "PageContact";
    }
>;

export default function Contact({
    contactPageData,
    socialMediaData,
}: {
    contactPageData: ContactPage;
    socialMediaData: ConfigurationPage;
}) {
    const contactTranslations = contactPageData?.translations;
    const email = contactPageData.email || "";

    const [, dispatch] = useStoreProp("socialMediaData");

    useEffect(() => {
        dispatch.setSocialMediaData(socialMediaData.socialMedia);
    }, [dispatch, socialMediaData.socialMedia]);

    return (
        <>
            <Meta title={`${contactPageData.title} · Aga Chainska`} />
            <form
                action="https://formsubmit.co/a.chainska@gmail.com"
                method="POST"
                className="pb-52 lg:pb-16"
            >
                <MainContainer topPadding={true} as="section">
                    <ContactIllus />
                    <div tw="col-start-1 col-end-13 lg:col-end-6">
                        <H1>{contactTranslations?.h1Title}</H1>
                        <div className="hidden lg:block">
                            <SocialMedia
                                items={socialMediaData?.socialMedia}
                                variant="big"
                            />
                        </div>
                    </div>
                    <div tw="col-start-1 lg:col-start-7 col-end-13 lg:col-end-12 lg:pt-24">
                        <TextTextarea
                            id="contact"
                            name="contact"
                            label={contactTranslations?.messageLabel || ""}
                            required={true}
                        />
                        <div className="grid mb-10 lg:grid-cols-2 gap-7 mt-7">
                            <div>
                                <TextTextarea
                                    as="input"
                                    id="name"
                                    name="name"
                                    type="text"
                                    label={contactTranslations?.nameLabel || ""}
                                    required={true}
                                />
                            </div>
                            <div>
                                <TextTextarea
                                    as="input"
                                    id="email"
                                    name="email"
                                    type="email"
                                    label={
                                        contactTranslations?.emailLabel || ""
                                    }
                                    required={true}
                                />
                            </div>
                        </div>
                        <Button type="submit">
                            {contactTranslations?.sendButtonText || ""}
                        </Button>
                        <span className="block mt-6 lg:inline-block lg:mt-0 lg:ml-6">
                            {contactTranslations?.findMeText || ""}
                            <EmailLink href={`mailto:${email}`}>
                                {email}
                            </EmailLink>
                        </span>
                    </div>
                </MainContainer>
            </form>
        </>
    );
}

export const getStaticProps: GetStaticProps = async ({ locale = "en" }) => {
    let page = {
        data: {},
        query: "",
        variables: {
            relativePath: `${locale}/contact.md`,
        },
    } as Page;

    const socialMediaData = await fetchSocialMediaData({ locale });

    if (!socialMediaData) {
        return {
            notFound: true,
        };
    }

    try {
        const { variables, data, query } = await client.queries.page(
            page.variables
        );

        page = { variables, data, query };
    } catch {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            ...(await serverSideTranslations(locale)),
            contactPageData: page.data.page,
            socialMediaData,
        },
    };
};
