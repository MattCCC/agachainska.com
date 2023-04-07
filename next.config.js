/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config.js');
const withTwin = require('./withTwin.js')

module.exports = withTwin({
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ['src', '__tests__/src']
  },
  i18n,
  compiler: {
    styledComponents: true,
    removeConsole: {
      exclude: ['error'],
    },
  },
  env: {},
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.tsx?$/,
      use: ['@svgr/webpack'],
    },
      {
        test: /\.ya?ml$/,
        use: 'js-yaml-loader',
      },
    )

    return config
  },
});
