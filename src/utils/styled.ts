import isPropValid from "@emotion/is-prop-valid";

export interface StyledOptions {
    label?: string;
    shouldForwardProp?: (propName: string) => boolean;
    target?: string;
}

/**
 * Exclude the props for DOM Element
 * @param {string[]} excludes                       The list of props that are excluded
 * @return {StyledOptions}   Styled options for JSX Intrinsic Elements
 */
export const excludeProps = (
    excludes: string[] = []
): StyledOptions => ({
    shouldForwardProp: (prop: string): boolean =>
        isPropValid(prop) && !excludes.includes(prop),
});

/**
 * Include props
 * @param {string[]} includesList                   The list of props that are included
 * @return {StyledOptions}   Styled options for JSX Intrinsic Elements
 */
export const includeProps = (
    includesList: string[] = []
): StyledOptions => ({
    shouldForwardProp: (prop: string): boolean =>
        isPropValid(prop) || includesList.includes(prop),
});
