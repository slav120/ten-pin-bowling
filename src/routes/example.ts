import * as express from 'express';

// Route for getting static page content
export const register = (app: express.Application, pool: any) => {
    app.get(`/v1/example/:name`, async (req: any, res) => {
        res.end('Hello ' + req.params.name + '!');
    });
};
