import { styled } from "twin.macro";
import { Link as TranslatedLink, useIntl } from "gatsby-plugin-intl";
import { excludeProps } from "@utils/styled";
export { FormattedMessage as Translate } from "gatsby-plugin-intl";

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
export const Link = styled(
    TranslatedLink,
    excludeProps(["isCurrentPage"])
)(() => []);

/**
 * Component
 * @param props
 */
export function TranslateText({ id }: Props) {
    const intl = useIntl();

    return <>{intl.formatMessage({ id })}</>;
}
