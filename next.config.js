/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config.js');

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ['src', '__tests__/src']
  },
  i18n,
  compiler: {
		emotion: true,
    styledComponents: true,
    removeConsole: {
      exclude: ['error'],
    },
  },
  env: {},
  webpack(config) {
    config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      }, 
      {
        test: /\.ya?ml$/,
        use: 'js-yaml-loader',
      },
    )

    return config
  },
};
