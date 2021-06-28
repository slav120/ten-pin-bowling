export const getExample = async (name: any, pool: any) => {
    try {
        return 'Hello ' + name + '!';
    } catch (err) {
        return { error: err.message || err };
    }
};
