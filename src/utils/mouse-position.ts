/**
 * Get the mouse position
 * @param e Event
 */
export default function getMousePosition(e: any) {
    let posx = 0;
    let posy = 0;

    if (!e) {
        e = window.event;
    }

    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
    } else if (e.clientX || e.clientY) {
        posx =
            e.clientX +
            document.body.scrollLeft +
            document.documentElement.scrollLeft;
        posy =
            e.clientY +
            document.body.scrollTop +
            document.documentElement.scrollTop;
    }

    return { x: posx, y: posy };
}
