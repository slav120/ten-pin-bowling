import * as express from 'express';
import mysql from 'mysql2/promise';

import * as example from './example';

export const register = (app: express.Application) => {
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
    const pool = mysql.createPool(dbconfig);

    // define a route handler for the default home page
    app.get('/', (req: any, res) => {
        res.send('Coming soon');
    });

    // Register the routes
    example.register(app, pool);
};
