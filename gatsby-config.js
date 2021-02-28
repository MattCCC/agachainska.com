module.exports = {
    plugins: [
        "gatsby-plugin-webpack-bundle-analyser-v2",
        `gatsby-plugin-sass`,
        `gatsby-plugin-emotion`,
        "gatsby-plugin-postcss",
        {
            resolve: `gatsby-plugin-alias-imports`,
            options: {
                alias: {
                    "@src": "src",
                    "@components": "src/components",
                    "@layouts": "src/layouts",
                    "@pages": "src/pages",
                    "@styles": "src/styles",
                    "@templates": "src/templates",
                    "@posts": "content/posts",
                    "@utils": "src/utils",
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
