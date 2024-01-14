export const delay = (milliseconds: number) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(null), milliseconds);
    });
};
