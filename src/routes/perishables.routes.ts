import {Express, Request, Response, NextFunction} from 'express'
import {CommonRoutesConfig} from './common.routes';
import PerishablesController from '../controllers/perishables.controller'

export class PerishablesRoutes extends CommonRoutesConfig {
    constructor(app: Express) {
        super(app, 'PerishablesRoutes');
    }

    configureRoutes() {

        this.app
            .route(`/:item/add`)
            .post(PerishablesController.addItem);

        this.app
            .route(`/:item/sell`)
            .post((req: Request, res: Response) => {
                res.status(200).send(`Post to sell item ${req.params.item}`);
            });

        this.app
            .route(`/:item/quantity`)
            .get(PerishablesController.getItem);

        return this.app;
    }

}