"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
// Route for getting static page content
const register = (app, pool) => {
    app.get(`/v1/example/:name`, async (req, res) => {
        res.end('Hello ' + req.params.name + '!');
    });
};
exports.register = register;
//# sourceMappingURL=example.js.map