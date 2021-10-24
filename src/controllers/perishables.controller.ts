import {Request, Response, NextFunction} from 'express'

import PerishablesService from '../services/perishables.services';

class PerishablesController {
    async getItem (req: Request, res: Response, next: NextFunction) {
        const itemName = req.params.item;

        const result = await PerishablesService.get(itemName);

        res.status(200).json(result)
    }

    async addItem (req: Request, res: Response, next: NextFunction) {
        const name = req.params.item;
        const {quantity, expiry} = req.body

        const resource = {
            name: name,
            quantity: quantity,
            expiry: expiry
        }
        const result = await PerishablesService.create(resource);
        //.json(result)
        res.status(200).json({status: "success"})

    };
}

export default new PerishablesController();

