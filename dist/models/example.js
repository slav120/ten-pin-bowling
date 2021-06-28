"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExample = void 0;
const getExample = async (name, pool) => {
    try {
        return 'Hello ' + name + '!';
    }
    catch (err) {
        return { error: err.message || err };
    }
};
exports.getExample = getExample;
//# sourceMappingURL=example.js.map