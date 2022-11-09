/**
 * Check if url is an image
 * @param url Link to an image
 * @returns {boolean} True if it's an image
 */
export default function isImageURL(url: string): boolean {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}
