/**
 * Map number x from range [a, b] to [c, d]
 */
export const mapNumber = (
    x: number,
    a: number,
    b: number,
    c: number,
    d: number
): number => ((x - a) * (d - c)) / (b - a) + c;
