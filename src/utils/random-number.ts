/**
 * Get Random Number
 * @param min Minimum number
 * @param max Maximum number
 */
export function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
