import { useIntl } from "gatsby-plugin-intl";

/**
 * Translate Text
 * @param {string} id   Unique identifier of a translation
 */
export function TranslateText(id: string): string {
    const intl = useIntl();

    return intl.formatMessage({ id });
}
