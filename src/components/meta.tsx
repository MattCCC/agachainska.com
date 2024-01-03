import { memo, PropsWithChildren } from "react";

import Head from "next/head";

import { useSiteMetadata } from "hooks/use-site-metadata";

interface Props {
    title?: string;
    description?: string;
    prefetchPage?: string | null;
    article?: boolean;
}

export const Meta = memo(
    ({
        title,
        description,
        article = false,
        prefetchPage = null,
        children,
    }: PropsWithChildren<Props>) => {
        const {
            title: defaultTitle,
            description: defaultDescription,
            image,
            siteUrl,
            twitterUsername,
        } = useSiteMetadata();

        const seo = {
            title: title ?? defaultTitle,
            description: description ?? title + " " + defaultDescription,
            image: `${siteUrl}${image}`,
        };

        return (
            <Head>
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />
                <meta name="image" content={seo.image} />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, maximum-scale=2, viewport-fit=cover"
                />

                {article && <meta property="og:type" content="article" />}

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

                {prefetchPage && <link rel="prefetch" href={prefetchPage} />}

                {children}
            </Head>
        );
    }
);
