"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stock_model_1 = __importDefault(require("../models/stock.model"));
const worker_1 = require("threads/worker");
const stocks = {
    sell(stocks, saleQty, quantityLeft) {
        const saleQuantity = saleQty;
        let quantityLeftToSell = quantityLeft;
        stocks.forEach((stock) => __awaiter(this, void 0, void 0, function* () {
            if (stock['dataValues']['quantity'] < quantityLeftToSell) {
                if (quantityLeftToSell > 0) {
                    quantityLeftToSell -= stock['dataValues']['quantity'];
                    yield stock_model_1.default.destroy({
                        where: {
                            id: stock['dataValues']['id']
                        }
                    });
                }
            }
            else if (stock['dataValues']['quantity'] == quantityLeftToSell) {
                if (quantityLeftToSell > 0) {
                    quantityLeftToSell -= stock['dataValues']['quantity'];
                    yield stock_model_1.default.destroy({
                        where: {
                            id: stock['dataValues']['id']
                        }
                    });
                }
            }
            else if (stock['dataValues']['quantity'] > quantityLeftToSell) {
                if (quantityLeftToSell > 0) {
                    let stockquantityLeft = stock['dataValues']['quantity'] - quantityLeftToSell;
                    quantityLeftToSell -= quantityLeftToSell;
                    yield stock_model_1.default.update({ quantity: stockquantityLeft }, {
                        where: {
                            id: stock['dataValues']['id']
                        }
                    });
                }
            }
        }));
        return true;
    }
};
(0, worker_1.expose)(stocks);
