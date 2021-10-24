import { Sequelize, Op } from 'sequelize'
import Perishable from '../models/perishable.model'
import { CreatePerishableDTO } from '../dto/perishables.dto';
import database from '../utils/connect'

class PerishablesDAO {

    constructor() {
    }

    async getItemQuantity(name: string) {

        const quantity = await Perishable.sum('quantity', {
            where: {
                name: name,
                expiry: {
                    [Op.gt]: Date.now(),
                }
            },
        });

        return quantity
    }

    async getItemMinExpiry(name: string) {
        const expiry = await Perishable.min('expiry', {
            where: {
                name: name,
                expiry: {
                    [Op.gt]: Date.now(),
                }
            }
        })

        return expiry
    }

    async addItem(payload: CreatePerishableDTO) {
        const item = await Perishable.create(payload)
        return item
    }

}

export default new PerishablesDAO();