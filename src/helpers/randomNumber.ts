export const randomNumber = (maxNumber: number) => {
    // quick uniform shortcuts
    return Math.floor(Math.random() * (maxNumber - 0 + 1)) + 0;
};
