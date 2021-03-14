/**
 * Toggle state boolean
 * @param {string} type      State key
 */
export const toggle = <T1, T2 = T1>(type: keyof T1): any => (_prevState: T2, bool: boolean): any => ({
    [type]: bool,
});
