/**
 * Fetch image & use the browser's cache if possible
 * It might be particularly useful if an image is used within svg & additional transformations are made
 * @param url Image url to cache
 * @returns {Promise<string>} Image base64 encoded data
 */
export const fetchCachedImage = async (
    url: string,
    cacheName = "images"
): Promise<{ blob: string }> => {
    try {
        const cache = await self.caches.open(cacheName);
        const cachedResponse = await cache.match(url);

        if (cachedResponse) {
            const blob = await cachedResponse.text();

            return { blob };
        }

        const img = new Image();
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        return new Promise((resolve, reject) => {
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                context?.drawImage(img, 0, 0);

                const blob = canvas.toDataURL("image/jpeg");

                // Store the image data in the cache
                const response = new Response(blob, {
                    headers: { "Content-Type": "text/plain" },
                });

                cache.put(url, response);

                resolve({ blob });
            };

            img.onerror = (error) => {
                reject(error);
            };

            img.src = url;
        });
    } catch (error) {
        throw new Error("Cache failure: " + error);
    }
};
