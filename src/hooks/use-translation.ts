import { useState, useEffect } from "react";
import translationData from "locales/common.json";

type TranslationData = typeof translationData;

export type Locales = keyof TranslationData;

export type TranslationKeys = keyof TranslationData[Locales];

interface TranslationHook {
    t: (key: TranslationKeys) => string;
    changeLocale: (newLocale: Locales) => void;
    locale: Locales;
}

export const locales = Object.keys(translationData);

export const getLocale = (defaultLocale: Locales = "en"): Locales => {
    const savedLocale =
        typeof localStorage !== "undefined"
            ? (localStorage.getItem("locale") as Locales)
            : null;

    return savedLocale ? savedLocale : defaultLocale;
};

export const useTranslation = (): TranslationHook => {
    const [locale, setLocale] = useState<Locales>(getLocale);

    const t = (key: TranslationKeys): string => {
        const translations = translationData[
            locale
        ] satisfies TranslationData[Locales];

        return translations?.[key] ?? key;
    };

    const changeLocale = (newLocale: Locales): void => {
        setLocale(newLocale);
    };

    useEffect(() => {
        localStorage?.setItem("locale", locale);
    }, [locale]);

    return { t, changeLocale, locale };
};
