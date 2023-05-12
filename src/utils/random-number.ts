/**
 * Get Random Number
 * @param min Minimum number
 * @param max Maximum number
 */
export function getRandomNumber(min: number, max: number): number {
    const v = max - min + 1;

    return Math.floor(Math.random() * v + min);
}
