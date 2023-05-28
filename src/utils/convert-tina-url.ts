/**
 * Convert tina cloud url back to local path
 *
 * @param url Image url
 * @returns {string} Local image path
 */
export const convertTinaUrl = (url: string): string =>
    url.replace(/^.*?tina\.[a-zA-Z]+\/.*?\//, "/");
