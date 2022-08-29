import lerp from "lerp";

import getMousePosition from "./mouse-position";
import { getRandomNumber } from "./random-number";
import { getWindowSize } from "./window-size";

let windowSize: { width: number; height: number };
let mousePosition: { x: number; y: number };

const resizeHandler = (): void => {
    windowSize = getWindowSize();
};

const mousemoveHandler = (e: MouseEvent): void => {
    mousePosition = getMousePosition(e);
};

/**
 * Calculate the viewport size
 */
const initViewportSize = (): void => {
    windowSize = getWindowSize();

    window.addEventListener("resize", resizeHandler);
};

/**
 * Track the mouse position
 */
const initMousePositionTracking = (): void => {
    mousePosition = { x: windowSize.width / 2, y: windowSize.height / 2 };

    window.addEventListener("mousemove", mousemoveHandler);
};

/**
 * Move an item according to cursor movement
 */
const moveItem = (el: HTMLElement): void => {
    const translationVals = { tx: 0, ty: 0 };
    const xstart = getRandomNumber(15, 60);
    const ystart = getRandomNumber(15, 60);
    const xStart1 = xstart * 2;
    const yStart1 = ystart * 2;

    const v1 = (x: number, b: number): number => (x * xStart1) / b - xstart;
    const v2 = (y: number, b: number): number => (y * yStart1) / b - ystart;

    const render = (): void => {
        // Calculate the amount to move.
        // Using linear interpolation to smooth things out.
        // Translation values will be in the range of [-start, start] for a cursor movement from 0 to the window's width/height
        translationVals.tx = lerp(
            translationVals.tx,
            v1(mousePosition.x, windowSize.width),
            0.07
        );

        translationVals.ty = lerp(
            translationVals.ty,
            v2(mousePosition.y, windowSize.height),
            0.07
        );

        el.style.transform = `translate(${translationVals.tx}px, ${translationVals.ty}px)`;

        requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
};

/**
 * Initialize Motion Grid
 * @param {string} elSelector        Parent Grid Element
 * @param {string} itemsSelector     Item selector (class by default)
 */
export const initMotionGrid = (
    elSelector = ".motion-grid",
    itemsSelector = ".motion-grid__item"
): void => {
    initViewportSize();
    initMousePositionTracking();

    const el = document.querySelector(elSelector);

    if (el === null) {
        return;
    }

    const items = el.querySelectorAll(itemsSelector);

    items.forEach((item) => moveItem(item as HTMLElement));
};

export const destroyMotionGrid = (): void => {
    window.removeEventListener("resize", resizeHandler);
    window.removeEventListener("mousemove", mousemoveHandler);
};
