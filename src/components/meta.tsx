import { FunctionComponent, memo } from "react";

import { useStaticQuery, graphql } from "gatsby";
import { Helmet } from "react-helmet";

import { useLocation } from "@reach/router";

interface Props {
    title?: string;
    description?: string;
    image?: string;
    article?: boolean;
}

export const Meta: FunctionComponent<Props> = memo(
    ({ title = "", description = "", image = null, article = false }) => {
        const { pathname } = useLocation();
        const { site } = useStaticQuery(query);

        const {
            defaultTitle,
            titleTemplate,
            defaultDescription,
            url,
            defaultImage,
            twitterUsername,
        } = site.siteMetadata;

        const seo = {
            title: title || defaultTitle,
            description: description || defaultDescription,
            image: `${url}${image || defaultImage}`,
            url: `${url}${pathname}`,
        };

        return (
            <Helmet
                title={seo.title}
                titleTemplate={titleTemplate}
                defer={false}
            >
                <meta name="description" content={seo.description} />
                <meta name="image" content={seo.image} />

                {seo.url && <meta property="og:url" content={seo.url} />}

                {(article ? true : null) && (
                    <meta property="og:type" content="article" />
                )}

                {seo.title && <meta property="og:title" content={seo.title} />}

                {seo.description && (
                    <meta property="og:description" content={seo.description} />
                )}

                {seo.image && <meta property="og:image" content={seo.image} />}

                <meta name="twitter:card" content="summary_large_image" />

                {twitterUsername && (
                    <meta name="twitter:creator" content={twitterUsername} />
                )}

                {seo.title && <meta name="twitter:title" content={seo.title} />}

                {seo.description && (
                    <meta
                        name="twitter:description"
                        content={seo.description}
                    />
                )}

                {seo.image && <meta name="twitter:image" content={seo.image} />}
            </Helmet>
        );
    }
);

export const query = graphql`
    query SEO {
        site {
            siteMetadata {
                defaultTitle: title
                titleTemplate
                defaultDescription: description
                url: url
                defaultImage: image
                twitterUsername
            }
        }
    }
`;
