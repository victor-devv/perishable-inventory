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
exports.PerishablesDAO = void 0;
const sequelize_1 = require("sequelize");
const perishable_model_1 = __importDefault(require("../models/perishable.model"));
const stock_model_1 = __importDefault(require("../models/stock.model"));
const config_1 = __importDefault(require("config"));
const threads_1 = require("threads");
class PerishablesDAO {
    getItemId(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield perishable_model_1.default.findOne({
                where: {
                    name: name
                },
                attributes: ['id']
            });
            return item ? item.id : null;
        });
    }
    getItemStock(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield perishable_model_1.default.findByPk(id, {
                include: [{
                        association: perishable_model_1.default.associations.stocks,
                        where: {
                            expiry: {
                                [sequelize_1.Op.gt]: Date.now(),
                            }
                        }
                    }]
            });
            return item ? item.stocks : null;
        });
    }
    getItemQuantity(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield this.getItemId(name);
            const quantity = yield stock_model_1.default.sum('quantity', {
                where: {
                    PerishableId: id,
                    expiry: {
                        [sequelize_1.Op.gt]: Date.now(),
                    },
                    deletedAt: null
                },
            });
            return quantity;
        });
    }
    getItemMinExpiry(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield this.getItemId(name);
            const expiry = yield stock_model_1.default.min('expiry', {
                where: {
                    PerishableId: id,
                    expiry: {
                        [sequelize_1.Op.gt]: Date.now(),
                    },
                    deletedAt: null
                }
            });
            return expiry;
        });
    }
    addItem(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield this.getItemId(payload.name);
            if (id === null) {
                const newItem = yield perishable_model_1.default.create({
                    name: payload.name,
                });
                const stock = yield newItem.createStock({
                    quantity: payload.quantity,
                    expiry: payload.expiry
                });
                return newItem;
            }
            else {
                const stock = yield stock_model_1.default.create({
                    PerishableId: id,
                    quantity: payload.quantity,
                    expiry: payload.expiry
                });
                return stock;
            }
        });
    }
    sellItem(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield this.getItemId(payload.name);
            if (id === null) {
                return false;
            }
            else {
                const itemQuantity = yield this.getItemQuantity(payload.name);
                const saleQuantity = payload.quantity;
                let quantityLeftToSell = payload.quantity;
                if (itemQuantity > 0 && itemQuantity >= payload.quantity) {
                    const stocks = yield this.getItemStock(id);
                    if (quantityLeftToSell > 0) {
                        let result = null;
                        let workerPool = null;
                        const workerPoolEnabled = config_1.default.get('WORKER_POOL_ENABLED');
                        if (workerPoolEnabled === 1) {
                            const stocksWorker = yield (0, threads_1.spawn)(new threads_1.Worker("../workers/thread-functions"));
                            result = yield stocksWorker.sell(stocks, saleQuantity, quantityLeftToSell);
                        }
                        else {
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
                        }
                    }
                    return { status: "success", message: "Item sold successfully" };
                }
                else {
                    return { status: "failed", message: "Stock balance is lower than the amount you intend to sell" };
                }
            }
            //return true
        });
    }
    deleteExpiredStocks() {
        return __awaiter(this, void 0, void 0, function* () {
            yield stock_model_1.default.destroy({
                where: {
                    expiry: {
                        [sequelize_1.Op.lt]: Date.now(),
                    },
                },
                force: true
            });
            return true;
        });
    }
}
exports.PerishablesDAO = PerishablesDAO;
exports.default = new PerishablesDAO();
