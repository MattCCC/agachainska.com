import { useIntl } from "gatsby-plugin-intl";

export { Link, FormattedMessage as Translate } from "gatsby-plugin-intl";

/**
 * Interfaces
 */
interface Props {
    id: string;
}

/**
 * Component
 * @param props
 */
export function TranslateText({ id }: Props) {
    const intl = useIntl();

    return <>{intl.formatMessage({ id })}</>;
}
