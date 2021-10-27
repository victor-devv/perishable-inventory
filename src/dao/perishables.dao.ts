import { Sequelize, Op } from 'sequelize'
import Perishable from '../models/perishable.model'
import Stock from '../models/stock.model';
import { CreatePerishableDTO, SellPerishableDTO } from '../dto/perishables.dto';
import database from '../utils/connect'
import config from 'config'
import { spawn, Thread, Worker } from "threads"
import { Stocks } from "../workers/thread-functions"

export class PerishablesDAO {

    async getItemId(name: string) {
        const item: any = await Perishable.findOne<any> ({
            where: {
                name: name
            },
            attributes: ['id']
        });

        return item ? item.id : null
    }

    async getItemStock(id: number) {
        const item: any = await Perishable.findByPk(id, {
            
            include: [{
                association: Perishable.associations.stocks,
                where: {
                    expiry: {
                        [Op.gt]: Date.now(),
                    }
                }
            }]
        });

        return item ? item.stocks : null
    }

    async getItemQuantity(name: string) {
        const id: number = await this.getItemId(name)

        const quantity = await Stock.sum('quantity', {
            where: {
                PerishableId: id,
                expiry: {
                    [Op.gt]: Date.now(),
                },
                deletedAt: null
            },
        });

        return quantity
    }

    async getItemMinExpiry(name: string) {
        const id: number = await this.getItemId(name)

        const expiry = await Stock.min('expiry', {
            where: {
                PerishableId: id,
                expiry: {
                    [Op.gt]: Date.now(),
                },
                deletedAt: null
            }
        })

        return expiry
    }

    async addItem(payload: CreatePerishableDTO) {
        const id: number = await this.getItemId(payload.name)

        if (id === null) {
            const newItem = await Perishable.create({
                name: payload.name,
            });

            const stock = await newItem.createStock({
                quantity: payload.quantity,
                expiry: payload.expiry
            });

            return newItem
        } else {

            const stock = await Stock.create({
                PerishableId: id,
                quantity: payload.quantity,
                expiry: payload.expiry
            });

            return stock

        }
        
    }

    async sellItem(payload: SellPerishableDTO) {

        const id: number = await this.getItemId(payload.name)

        if (id === null) {
            return false
        } else {
            const itemQuantity: number = await this.getItemQuantity(payload.name)
            const saleQuantity: number = payload.quantity
            let quantityLeftToSell: number = payload.quantity

            if (itemQuantity > 0 && itemQuantity >= payload.quantity) {
                const stocks: [] = await this.getItemStock(id)

                if (quantityLeftToSell > 0) {
                    let result = null
                    let workerPool = null
                    const workerPoolEnabled = config.get<number>('WORKER_POOL_ENABLED')

                    if (workerPoolEnabled === 1) {
                        const stocksWorker = await spawn<Stocks>(new Worker("../workers/thread-functions"))

                        result = await stocksWorker.sell(stocks, saleQuantity, quantityLeftToSell)

                    } else {

                        stocks.forEach(async (stock) => {
                            if (stock['dataValues']['quantity'] < quantityLeftToSell) {

                                if (quantityLeftToSell > 0) {
                                    quantityLeftToSell -= stock['dataValues']['quantity']

                                    await Stock.destroy({
                                        where: {
                                            id: stock['dataValues']['id']
                                        }
                                    })
                                }

                            } else if (stock['dataValues']['quantity'] == quantityLeftToSell) {

                                if (quantityLeftToSell > 0) {
                                    quantityLeftToSell -= stock['dataValues']['quantity']

                                    await Stock.destroy({
                                        where: {
                                            id: stock['dataValues']['id']
                                        }
                                    })
                                    
                                }

                            } else if (stock['dataValues']['quantity'] > quantityLeftToSell) {

                                if (quantityLeftToSell > 0) {
                                    let stockquantityLeft = stock['dataValues']['quantity'] - quantityLeftToSell
                                    quantityLeftToSell -= quantityLeftToSell

                                    await Stock.update({ quantity: stockquantityLeft }, {
                                        where: {
                                            id: stock['dataValues']['id']
                                        }
                                    });
                                }

                            }
                        });

                    }
                }
                
                return {status: "success", message: "Item sold successfully"}

            } else {
                return {status: "failed", message: "Stock balance is lower than the amount you intend to sell"}
            }

        }
        //return true
    }

    async deleteExpiredStocks() {
        await Stock.destroy({
            where: {
                expiry: {
                    [Op.lt]: Date.now(),
                },
            },
            force: true
        })
        return true
    }

}

export default new PerishablesDAO();