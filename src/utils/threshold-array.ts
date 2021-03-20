/**
 * Threshold Array
 * @param {number} steps Number of steps
 */
export const thresholdArray = (steps: number): number[] =>
    Array(steps + 1)
        .fill(0)
        .map((_, index) => index / steps || 0);

