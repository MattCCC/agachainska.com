/**
 * Scroll to an element without a location hash change
 * @param selector Query selector (falls back use window)
 * @param y In conjunction with empty selector, position to scroll can be provided
 */
export const scrollTo = (selector: string | null = null, y = 0) => {
    const element = selector ? document.querySelector(selector) : null;
    const top = element
        ? element.getBoundingClientRect().top + window.scrollY
        : y;

    try {
        window.scrollTo({
            behavior: "smooth",
            top,
        });
    } catch (error) {
        // Fallback for older browsers
        window.scrollTo(0, top);
    }
};
