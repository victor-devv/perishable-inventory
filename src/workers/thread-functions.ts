import Stock from '../models/stock.model';

import { expose } from "threads/worker"

const stocks = {

    sell (stocks: any, saleQty: number, quantityLeft: number) {

        const saleQuantity = saleQty
        let quantityLeftToSell = quantityLeft

        stocks.forEach(async (stock: any) => {
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

        return true
    }

}

export type Stocks = typeof stocks

expose(stocks)