import lerp from "lerp";

import getMousePosition from "./mouse-position";
import { getRandomNumber } from "./random-number";
import { getWindowSize } from "./window-size";

let windowSize: { width: number; height: number };
let mousePosition: { x: number; y: number };

const elSelector = ".motion-grid";
const itemsSelector = ".motion-grid__item";

const translationVals = { tx: 0, ty: 0 };

const xstart = getRandomNumber(15, 60);
const ystart = getRandomNumber(15, 60);

const xStart1 = xstart * 2;
const yStart1 = ystart * 2;
const constrain = 50;
let items = null as unknown as NodeListOf<HTMLElement>;
let numItems = 0;

const v1 = (x: number, b: number): number => (x * xStart1) / b - xstart;
const v2 = (y: number, b: number): number => (y * yStart1) / b - ystart;

const resizeHandler = (): void => {
    windowSize = getWindowSize();
};

const mousemoveHandler = (e: MouseEvent): void => {
    mousePosition = getMousePosition(e);
    moveItems();
};

const initViewportSize = (): void => {
    windowSize = getWindowSize();

    window.addEventListener("resize", resizeHandler);
};

const initMousePositionTracking = (): void => {
    mousePosition = { x: windowSize.width / 2, y: windowSize.height / 2 };

    window.addEventListener("mousemove", mousemoveHandler);
};

const moveItem = (el: HTMLElement): void => {
    const box = el.getBoundingClientRect();

    // Using linear interpolation to smooth things out.
    // Translation values will be in the range of [-start, start] for a cursor movement from 0 to the window's width/height
    translationVals.tx = lerp(
        translationVals.tx,
        v1(mousePosition.x, windowSize.width),
        0.07,
    );

    translationVals.ty = lerp(
        translationVals.ty,
        v2(mousePosition.y, windowSize.height),
        0.07,
    );

    const calcX = -(mousePosition.y - box.y - box.height / 2) / constrain;
    const calcY = (mousePosition.x - box.x - box.width / 2) / constrain;

    const render = (): void => {
        el.style.transform = `perspective(100px) translate(${translationVals.tx}px, ${translationVals.ty}px) rotateX(${calcX}deg) rotateY(${calcY}deg)`;
    };

    requestAnimationFrame(render);
};

function moveItems() {
    for (let i = 0, l = numItems; i < l; i++) {
        const item = items[i] as HTMLElement;

        moveItem(item);
    }
}

function initItems() {
    const el = document.querySelector(elSelector);

    if (el === null) {
        return;
    }

    items = el.querySelectorAll(itemsSelector);
    numItems = items.length;
}

export const initMotionGrid = (): void => {
    initItems();
    initViewportSize();
    initMousePositionTracking();
};

export const destroyMotionGrid = (): void => {
    window.removeEventListener("resize", resizeHandler);
    window.removeEventListener("mousemove", mousemoveHandler);
};
