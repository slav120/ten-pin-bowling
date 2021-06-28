import * as express from 'express';

import { getExample } from '../models/example';

export const register = (app: express.Application, pool: any) => {
    app.get(`/v1/example/:name`, async (req: any, res) => {
        const example = await getExample(req.params.name, pool);
        res.end(example);
    });
};
