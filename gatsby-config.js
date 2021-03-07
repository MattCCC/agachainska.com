require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
    plugins: [
        "gatsby-plugin-webpack-bundle-analyser-v2",
        `gatsby-plugin-sass`,
        `gatsby-plugin-emotion`,
        "gatsby-plugin-postcss",
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
    ],
};
