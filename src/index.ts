import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import * as routes from './routes/';
const SENTRY_DSN = 'https://9d8f3885e10e4bc18a3ff931ef1ee6b9@o133385.ingest.sentry.io/5827143';
/* Leave this at the top */
const app = express();
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

app.use(cors());
// initialize configuration
dotenv.config();

// Limit the size frontend can send to backend
app.use(express.json({ limit: '10kb' })); // Body limit is 10

// Data Sanitization against XSS / scripts
app.use(xss());

const limit = rateLimit({
    max: 1000, // max requests
    windowMs: 60 * 60 * 1000, // 1 Hour
    message: 'Too many requests' // message to send
});

// GZIP all assets to minimize size on response
app.use(compression());

// make server object that contain port property and the value for our server.
const port = process.env.PORT || 8081;

// Configure routes
routes.register(app);

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err: any, req: any, res: any, next: any) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(res.sentry + '\n');
});

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
