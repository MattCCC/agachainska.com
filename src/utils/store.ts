type Funct<T, TT> = (_prevState: T, value: TT) => any;

/**
 * Toggle state boolean
 * @param {string} type      State key
 */
export const set = <T, T1, T2 = T>(type: keyof T): Funct<T2, T1> => (_prevState, value): any => ({
    [type]: value || false,
});
