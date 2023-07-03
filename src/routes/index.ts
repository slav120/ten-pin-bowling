import * as express from 'express';
import mysql from 'mysql2/promise';

import * as tenpingame from './tenPinGame';

export const register = (app: express.Application) => {
    // define a route handler for the default home page
    app.get('/', (req: any, res) => {
        res.send('Coming soon');
    });

    // Register the routes
    tenpingame.register(app);
};
