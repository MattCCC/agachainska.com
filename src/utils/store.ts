import { isDev } from "./detect-env";

type Funct<T, TT> = (_prevState: T, value: TT) => any;

/**
 * Toggle state boolean
 * @param {string} type      State key
 */
export const set = <T, T1, T2 = T>(type: keyof T): Funct<T2, T1> => (_prevState, value): any => {
    if (isDev()) {
        // eslint-disable-next-line no-console
        console.log("store:", type, value, " prev:", _prevState);
    }

    return {
        [type]: value,
    };
};
