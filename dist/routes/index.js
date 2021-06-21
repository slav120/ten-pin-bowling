"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const example = __importStar(require("./example"));
const register = (app) => {
    // Create the mysql connection config
    const dbconfig = {
        host: process.env.host,
        user: process.env.username,
        password: process.env.password,
        database: process.env.database,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    };
    // Make the db connection
    const pool = promise_1.default.createPool(dbconfig);
    // define a route handler for the default home page
    app.get('/', (req, res) => {
        res.send('Coming soon');
    });
    // Register the routes
    example.register(app, pool);
};
exports.register = register;
//# sourceMappingURL=index.js.map