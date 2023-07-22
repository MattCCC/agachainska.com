export const generateUniqueString = () => {
    const timestamp = new Date().getTime();
    const randomNum = Math.random()
                        .toString(36)
                        .substring(2);

    return `${timestamp}-${randomNum}`;
};
