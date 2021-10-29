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
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const perishables_dao_1 = require("../../src/dao/perishables.dao");
describe('PerishablesDAO', () => {
    let instance;
    beforeEach(() => {
        instance = new perishables_dao_1.PerishablesDAO();
    });
    it('should get the id of an item based on the item name if item already exists in the db', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(instance).toBeDefined();
        expect(instance.getItemId).toBeDefined();
        expect(instance).toBeInstanceOf(perishables_dao_1.PerishablesDAO);
        const itemId = yield instance.getItemId('meat');
        expect(itemId).toBeDefined();
    }));
    it('should get the stock of an item based on the item id if item already exists in the db', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(instance).toBeDefined();
        expect(instance.getItemStock).toBeDefined();
        expect(instance).toBeInstanceOf(perishables_dao_1.PerishablesDAO);
        const itemstock = yield instance.getItemStock(1);
        expect(itemstock).toBeDefined();
    }));
    it('should get the quantity of an item based on the item name if item already exists in the db', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(instance).toBeDefined();
        expect(instance.getItemQuantity).toBeDefined();
        expect(instance).toBeInstanceOf(perishables_dao_1.PerishablesDAO);
        const itemQty = yield instance.getItemQuantity('meat');
        expect(itemQty).toBeDefined();
    }));
    it('should get the earliest expiry date of an item in stock based on the item name if item already exists in the db', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(instance).toBeDefined();
        expect(instance.getItemMinExpiry).toBeDefined();
        expect(instance).toBeInstanceOf(perishables_dao_1.PerishablesDAO);
        const itemExp = yield instance.getItemMinExpiry('meat');
        expect(itemExp).toBeDefined();
    }));
    it('should add a new item', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(instance).toBeDefined();
        expect(instance.addItem).toBeDefined();
        expect(instance).toBeInstanceOf(perishables_dao_1.PerishablesDAO);
        const res = yield instance.addItem({
            name: 'potatoe',
            quantity: 10,
            expiry: 1640991600000
        });
        expect(res).toBeDefined();
    }));
    it('should sell an existing item', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(instance).toBeDefined();
        expect(instance.sellItem).toBeDefined();
        expect(instance).toBeInstanceOf(perishables_dao_1.PerishablesDAO);
        const res = yield instance.sellItem({
            name: 'potatoe',
            quantity: 2,
        });
        expect(res).toBeDefined();
    }));
    it('should delete expired stocks', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(instance).toBeDefined();
        expect(instance.deleteExpiredStocks).toBeDefined();
        expect(instance).toBeInstanceOf(perishables_dao_1.PerishablesDAO);
        const res = yield instance.deleteExpiredStocks();
        expect(res).toBeDefined();
    }));
});
