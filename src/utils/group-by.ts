/**
 * Group objects by keys
 * @param arr Array of objects
 * @param key Key by which grouping should be performed
 * @returns {array} Array of keys with grouped objects
 */
export const groupBy = (arr: any[], key: string): any[] =>
    arr.reduce((prev: any, curr: any) => {
        (prev[curr[key]] = prev[curr[key]] || []).push(curr);

        return prev;
    }, {});
