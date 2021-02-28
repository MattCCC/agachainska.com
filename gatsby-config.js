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
        },
        extensions: ["js", "jsx", "ts", "tsx"],
      },
    },
  ],
}
