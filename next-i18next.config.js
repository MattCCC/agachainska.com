/** @type {import('next-i18next').NextJsI18NConfig} */
const { resolve } = require("path");

/** @type import("next").I18NConfig */
const i18n = {
	locales: ["en", "pl"],
	defaultLocale: "en",
};

/** @type import("next-i18next").UserConfig */
const next18nextConfig = {
	i18n,
	fallbackLng: "en",
	keySeparator: ".",
	nsSeparator: ":",
	localePath: resolve("./public/locales"),
	reloadOnPrerender: !(process.env.NODE_ENV === "production")
};

module.exports = next18nextConfig;