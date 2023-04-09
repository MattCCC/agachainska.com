// @ts-check

const i18n = {
	locales: ["en", "pl"],
	defaultLocale: "en",
};

/**
 * @type {import('next-i18next').UserConfig}
 */
const next18nextConfig = {
	i18n,
	fallbackLng: "en",
	keySeparator: ".",
	nsSeparator: ":",

	// https://www.i18next.com/overview/configuration-options#logging
	debug: false,

	// To avoid issues when deploying to some paas (vercel...)
	localePath:
		typeof window === 'undefined'
			? require('path').resolve('./public/locales')
			: '/locales',
	reloadOnPrerender: process.env.NODE_ENV === 'development',
};

module.exports = next18nextConfig;