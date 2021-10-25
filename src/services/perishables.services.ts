import PerishablesDAO from '../dao/perishables.dao';
import { CRUD } from '../interfaces/crud.interface';
import { CreatePerishableDTO, SellPerishableDTO } from '../dto/perishables.dto'

// 
class PerishablesService implements CRUD {
    async get(name: string) {
        const qty = await PerishablesDAO.getItemQuantity(name);
        const expiry = await PerishablesDAO.getItemMinExpiry(name);

        return {quantity: qty, expiry: expiry}
    }

    async create(resource: CreatePerishableDTO) {
        return PerishablesDAO.addItem(resource);
    }

    async sell(resource: SellPerishableDTO) {
        return PerishablesDAO.sellItem(resource);
    }

    async deleteExpiredStock() {
        return PerishablesDAO.deleteExpiredStocks()
    }

}

export default new PerishablesService();