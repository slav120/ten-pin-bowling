"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const example_1 = require("../models/example");
const register = (app, pool) => {
    app.get(`/v1/example/:name`, async (req, res) => {
        const example = await example_1.getExample(req.params.name, pool);
        res.end(example);
    });
};
exports.register = register;
//# sourceMappingURL=example.js.map