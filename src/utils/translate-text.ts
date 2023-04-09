import { useTranslation } from "next-i18next";

/**
 * Translate Text
 * @param {string} id   Unique identifier of a translation
 */
export function TranslateText(id: string): string {
    const { t } = useTranslation();

    return t(id);
}
