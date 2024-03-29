export interface StyledOptions {
    label?: string;
    shouldForwardProp?: (propName: string | number | symbol) => boolean;
    target?: string;
}

/**
 * Exclude the props for DOM Element
 * @param {string[]} excludes                       The list of props that are excluded
 * @return {StyledOptions}   Styled options for JSX Intrinsic Elements
 */
export const excludeProps = (excludes: string[] = []): StyledOptions => ({
    shouldForwardProp: (prop) => !excludes.includes(String(prop)),
});
