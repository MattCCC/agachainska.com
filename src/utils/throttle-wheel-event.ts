export default function throttleWheelEvent(
    fn: (event: WheelEvent) => void,
    wait: number
): (event: WheelEvent) => void {
    let time = Date.now();

    return (event: WheelEvent): void => {
        // Dismiss every wheel event with deltaY less than 4
        if (Math.abs(event.deltaY) < 4) {
            return;
        }

        if (time + wait - Date.now() < 0) {
            fn(event);
            time = Date.now();
        }
    };
}
