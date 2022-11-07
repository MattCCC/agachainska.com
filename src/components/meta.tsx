import { Fragment, memo, PropsWithChildren } from "react";

import { useLocation } from "@reach/router";

import { useSiteMetadata } from "hooks/use-site-metadata";

interface Props {
    title?: string;
    description?: string;
    image?: string | null;
    article?: boolean;
}

export const Meta = memo(
    ({ title, description, children }: PropsWithChildren<Props>) => {
        const { pathname } = useLocation();
        const {
            title: defaultTitle,
            description: defaultDescription,
            image,
            siteUrl,
            twitterUsername,
        } = useSiteMetadata();

        const seo = {
            title: title || defaultTitle,
            description: description || defaultDescription,
            image: `${siteUrl}${image}`,
            url: `${siteUrl}${pathname}`,
        };

        return (
            <Fragment>
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />
                <meta name="image" content={seo.image} />

                {seo.url && <meta property="og:url" content={seo.url} />}

                {/* {(article ? true : null) && (
                    <meta property="og:type" content="article" />
                )} */}

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

                {children}
            </Fragment>
        );
    }
);
