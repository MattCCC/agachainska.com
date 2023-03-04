import { memo, PropsWithChildren } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import { useSiteMetadata } from "hooks/use-site-metadata";

interface Props {
    title?: string;
    description?: string;
    image?: string | null;
    article?: boolean;
}

export const Meta = memo(
    ({
        title,
        description,
        article = false,
        children,
    }: PropsWithChildren<Props>) => {
        const { pathname } = useRouter();
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
            <Head>
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />
                <meta name="image" content={seo.image} />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
                />

                {seo.url && <meta property="og:url" content={seo.url} />}

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

                {children}
            </Head>
        );
    }
);
