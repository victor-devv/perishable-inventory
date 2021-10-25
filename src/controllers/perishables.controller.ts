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
        res.status(200).json({status: "success", message: "Item added successfully"})

    };

    async sellItem (req: Request, res: Response, next: NextFunction) {
        const name = req.params.item;
        const {quantity} = req.body

        const resource = {
            name: name,
            quantity: quantity,
        }
        
        const result = await PerishablesService.sell(resource);
        //.json(result)
        res.status(200).json(result)

    }

}

export default new PerishablesController();

