import PerishablesDAO from '../dao/perishables.dao';
import { CRUD } from '../interfaces/crud.interface';
import { CreatePerishableDTO } from '../dto/perishables.dto'

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

    async sell(name: string) {
        
    }

}

export default new PerishablesService();