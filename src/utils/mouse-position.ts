/**
 * Get the mouse position
 * @param e Event
 */
export default function getMousePosition(e: MouseEvent): {
    x: number;
    y: number;
} {
    if (typeof e.pageX !== "undefined") {
        return { x: e.pageX, y: e.pageY };
    }

    let posx = 0;
    let posy = 0;

    posx =
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
    posy =
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;

    return { x: posx, y: posy };
}
