import { gsap } from "gsap";
import lerp from "lerp";
import getMousePosition from "./mouse-position";
import { getRandomNumber } from "./random-number";
import { getWindowSize } from "./window-size";
import { mapNumber } from "./map-number";

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
const moveItem = (el: Element): void => {
    const translationVals = { tx: 0, ty: 0 };
    const xstart = getRandomNumber(15, 60);
    const ystart = getRandomNumber(15, 60);

    // Infinite loop
    const render = (): void => {
        // Calculate the amount to move.
        // Using linear interpolation to smooth things out.
        // Translation values will be in the range of [-start, start] for a cursor movement from 0 to the window's width/height
        translationVals.tx = lerp(
            translationVals.tx,
            mapNumber(mousePosition.x, 0, windowSize.width, -xstart, xstart),
            0.07
        );

        translationVals.ty = lerp(
            translationVals.ty,
            mapNumber(mousePosition.y, 0, windowSize.height, -ystart, ystart),
            0.07
        );

        gsap.set(el, {
            x: translationVals.tx,
            y: translationVals.ty,
        });

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

    items.forEach((item) => moveItem(item));

    gsap.timeline()
        .set(items, { scale: 0.7, opacity: 0 }, 0)
        .to(
            items,
            {
                duration: 2,
                ease: "Expo.easeOut",
                scale: 1,
                stagger: { amount: 0.6, grid: "auto", from: "center" },
            },
            0
        )
        .to(
            items,
            {
                duration: 3,
                ease: "Power1.easeOut",
                opacity: 1,
                stagger: { amount: 0.6, grid: "auto", from: "center" },
            },
            0
        );
};

export const destroyMotionGrid = (): void => {
    window.removeEventListener("resize", resizeHandler);
    window.removeEventListener("mousemove", mousemoveHandler);
};
