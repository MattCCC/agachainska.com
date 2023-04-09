/**
 * Utility for using media queries based on given screen keys
 *
 * https://github.com/madebywild/wild-next/blob/main/docs/styling.md#media-queries
 */
import { theme } from "twin.macro";

/**
 * NOTE: Keep this in sync with the (custom) Tailwind theme `screens` config.
 * @see https://tailwindcss.com/docs/breakpoints
 */
export type Screen = "sm" | "md" | "lg" | "xl" | "2xl" | "max";
export const screens = theme<Record<Screen, string>>("screens");

// The maximum value is calculated as the minimum of the next one less 0.02px.
// @see https://www.w3.org/TR/mediaqueries-4/#mq-min-max
const getNextBpValue = (bp: string): string => `${parseInt(bp, 10) - 0.02}px`;

export const up = (bp: Screen): string => {
    const screen = screens[bp];

    return `@media only screen and (min-width: ${screen})`;
};

export const down = (bp: Screen): string => {
    const screen = getNextBpValue(screens[bp]);

    return `@media only screen and (max-width: ${screen})`;
};
