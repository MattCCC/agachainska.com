require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
    plugins: [
        "gatsby-plugin-webpack-bundle-analyser-v2",
        `gatsby-plugin-ts-config`,
        `gatsby-plugin-sass`,
        `gatsby-plugin-emotion`,
        "gatsby-plugin-postcss",
        `gatsby-plugin-image`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`, // Needed for dynamic images
        `gatsby-transformer-remark`,
        {
            resolve: `gatsby-transformer-yaml`,
            options: {
                // Conditionally set the typeName so that we both use a lowercased and capitalized type name
                typeName: ({ node }) => {
                    const name = node.sourceInstanceName;

                    if (name === `projects`) {
                        return `Project`;
                    }

                    return name;
                },
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `pages`,
                path: `${__dirname}/src/pages/`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/data/projects.yml`,
                name: `projects`,
            },
        },
        {
            resolve: "gatsby-plugin-svgr",
            options: {
                prettier: true, // use prettier to format JS code output (default)
                svgo: true, // use svgo to optimize SVGs (default)
                svgoConfig: {
                    plugins: [
                        { removeViewBox: true }, // remove viewBox when possible (default)
                        { cleanupIDs: true }, // remove unused IDs and minify remaining IDs (default)
                    ],
                },
            },
        },
        {
            resolve: `gatsby-plugin-alias-imports`,
            options: {
                alias: {
                    "@src": "src",
                    "@config": "src/config",
                    "@components": "src/components",
                    "@data": "src/data",
                    "@layouts": "src/layouts",
                    "@pages": "src/pages",
                    "@store": "src/store",
                    "@styles": "src/styles",
                    "@templates": "src/templates",
                    "@posts": "content/posts",
                    "@utils": "src/utils",
                    "@svg": "src/svg",
                    "@hooks": "src/hooks",
                    "@translations": "src/translations",
                },
                extensions: ["js", "jsx", "ts", "tsx"],
            },
        },
        {
            resolve: `gatsby-plugin-intl`,
            options: {
                path: `${__dirname}/src/translations`,
                languages: [`en`],
                defaultLanguage: `en`,
                redirect: false,
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Aga Chainska`,
                short_name: `Aga Chainska`,
                icon: `static/img/slider-pattern.png`,
                start_url: `/`,
                background_color: `#f7f7f7`,
                theme_color: `#191919`,
                display: `minimal-ui`
            }
        },
        `gatsby-plugin-offline`
    ],
};
