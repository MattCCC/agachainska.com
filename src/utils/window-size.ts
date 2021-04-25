export function getWindowSize(): { width: number; height: number } {
    if (typeof window === "undefined") {
        return { width: 0, height: 0 };
    }

    return { width: window.innerWidth, height: window.innerHeight };
}
