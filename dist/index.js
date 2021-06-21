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
const Sentry = __importStar(require("@sentry/node"));
const Tracing = __importStar(require("@sentry/tracing"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const routes = __importStar(require("./routes/"));
const SENTRY_DSN = 'https://9d8f3885e10e4bc18a3ff931ef1ee6b9@o133385.ingest.sentry.io/5827143';
/* Leave this at the top */
const app = express_1.default();
Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express({ app })
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0
});
// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
app.use(cors_1.default());
// initialize configuration
dotenv_1.default.config();
// Limit the size frontend can send to backend
app.use(express_1.default.json({ limit: '10kb' })); // Body limit is 10
// Data Sanitization against XSS / scripts
app.use(xss());
const limit = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests' // message to send
});
app.use('/v1/example/:slug', limit); // Setting limit on search route
// GZIP all assets to minimize size on response
app.use(compression());
// make server object that contain port property and the value for our server.
const port = process.env.PORT || 8081;
// Configure routes
routes.register(app);
// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());
// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(res.sentry + '\n');
});
// ////////////////////////////
// // start the express server
// app.listen(port, () => {
//     // tslint:disable-next-line:no-console
//     console.log(`server started at http://localhost:${port}`);
// });
//////////////////////////////////////
if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
        // Create a worker
        cluster.fork();
    }
}
else {
    // Workers share the TCP connection in this server
    // All workers use this port
    app.listen(port, () => {
        // tslint:disable-next-line:no-console
        console.log(`server started at http://localhost:${port}`);
    });
}
//# sourceMappingURL=index.js.map