import isPropValid from "@emotion/is-prop-valid";
import { StyledOptions } from "@emotion/styled";

/**
 * Exclude the props for DOM Element
 * @param {string[]} excludes                       The list of props that are excluded
 * @return {StyledOptions<JSX.IntrinsicElements>}   Styled options for JSX Intrinsic Elements
 */
export const excludeProps = (
    excludes: string[]
): StyledOptions<JSX.IntrinsicElements> => ({
    shouldForwardProp: (prop: string) =>
        isPropValid(prop) && !excludes.includes(prop),
});
