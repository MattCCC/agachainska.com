import isPropValid from "@emotion/is-prop-valid";
import { StyledOptions } from "@emotion/styled"

/**
 * This will solve the error for "React does not recognize the X prop on a DOM element". 
 * Technically we need to exclude the props for DOM Element 
 * @param {string[]} excludes The list of props that is excluded
 * @return {StyledOptions<JSX.IntrinsicElements>} It returns a styled options for JSX IntrinsicElements
 */
export const excludeProps = (excludes: string[]): StyledOptions<JSX.IntrinsicElements> => ({
    shouldForwardProp: (prop: string) => isPropValid(prop) && !excludes.includes(prop),
})