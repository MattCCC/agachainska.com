import {
    ElementRef,
    ReactNode,
    RefObject,
    useEffect,
    useRef,
    useMemo,
    PropsWithChildren,
} from "react";

import { css, styled } from "twin.macro";

import { useWindowSize } from "hooks/use-window-size";

interface Props {
    children: ReactNode;
}

type RefHandle = ElementRef<typeof SmoothScroll>;

interface ScrollData {
    ease: number;
    current: number;
    previous: number;
    rounded: number;
}

const ScrollWrapper = styled.div(() => [
    css`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    `,
]);

const setBodyHeight = (element: HTMLDivElement) => {
    document.body.style.height = `${element.getBoundingClientRect().height}px`;
};

const smoothScrollingHandler = (
    container: HTMLDivElement,
    data: ScrollData
) => {
    data.current = window.scrollY;
    data.previous += (data.current - data.previous) * data.ease;
    data.rounded = Math.round(data.previous * 100) / 100;

    container.style.transform = `translateY(-${data.previous}px)`;

    requestAnimationFrame(() => smoothScrollingHandler(container, data));
};

export const SmoothScroll = ({ children }: PropsWithChildren<Props>) => {
    const windowDimensions = useWindowSize();
    const containerRef = useRef<RefHandle>(null) as RefObject<HTMLDivElement>;
    const data = useMemo(
        () => ({
            ease: 0.09,
            current: 0,
            previous: 0,
            rounded: 0,
        }),
        []
    );

    useEffect(() => {
        if (containerRef.current) {
            setBodyHeight(containerRef.current);
        }
    }, [containerRef, windowDimensions.height]);

    useEffect(() => {
        requestAnimationFrame(() => {
            if (containerRef.current) {
                smoothScrollingHandler(containerRef.current, data);
            }
        });
    }, [containerRef, data]);

    return (
        <ScrollWrapper>
            <div ref={containerRef} style={{ willChange: "transform" }}>
                {children}
            </div>
        </ScrollWrapper>
    );
};

export default SmoothScroll;
