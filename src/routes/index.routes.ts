import {Express, Request, Response, NextFunction} from 'express'
import {CommonRoutesConfig} from './common.routes';

export class IndexRoutes extends CommonRoutesConfig {
    constructor(app: Express) {
        super(app, 'IndexRoutes');
    }

    configureRoutes() {
        this.app.route(`/healthcheck`)
            .get((req: Request, res: Response) => {
                res.status(200).send(`App Running`);
            })

        return this.app;
    }

}