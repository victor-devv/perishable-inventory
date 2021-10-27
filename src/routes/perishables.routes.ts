import {Express, Request, Response, NextFunction} from 'express'
import {CommonRoutesConfig} from './common.routes';
import PerishablesMiddleware from '../middleware/perishables.middleware';
import PerishablesController from '../controllers/perishables.controller'

export class PerishablesRoutes extends CommonRoutesConfig {
    constructor(app: Express) {
        super(app, 'PerishablesRoutes');
    }

    configureRoutes() {

        this.app
            .route(`/:item/add`)
            .post(
                PerishablesMiddleware.validateRequiredAddItemBodyFields,
                PerishablesController.addItem
            );

        this.app
            .route(`/:item/sell`)
            .post(
                PerishablesMiddleware.validateRequiredSellItemBodyFields,
                PerishablesController.sellItem
            );

        this.app
            .route(`/:item/quantity`)
            .get(PerishablesController.getItem);

        return this.app;
    }

}