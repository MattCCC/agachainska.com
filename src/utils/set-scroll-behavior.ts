export const setScrollBehaviour = (
    scrollBehavior: CSSStyleDeclaration["scrollBehavior"]
) => {
    const mainFrame = document.querySelector("html");

    if (mainFrame) {
        mainFrame.style.scrollBehavior = scrollBehavior;
    }
};
