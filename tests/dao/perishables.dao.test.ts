import 'jest';
import * as express from 'express';
import { PerishablesDAO } from '../../src/dao/perishables.dao'

describe('PerishablesDAO', () => {
    let instance: PerishablesDAO;

    beforeEach(() => {
        instance = new PerishablesDAO();
    });

    it('should get the id of an item based on the item name if item already exists in the db', async () => {
        expect(instance).toBeDefined();
        expect(instance.getItemId).toBeDefined();

        expect(instance).toBeInstanceOf(PerishablesDAO);
        const itemId = await instance.getItemId('meat');
        expect(itemId).toBeDefined();
    });

    it('should get the stock of an item based on the item id if item already exists in the db', async () => {
        expect(instance).toBeDefined();
        expect(instance.getItemStock).toBeDefined();

        expect(instance).toBeInstanceOf(PerishablesDAO);
        const itemstock = await instance.getItemStock(1);
        expect(itemstock).toBeDefined();
    });

    it('should get the quantity of an item based on the item name if item already exists in the db', async () => {
        expect(instance).toBeDefined();
        expect(instance.getItemQuantity).toBeDefined();

        expect(instance).toBeInstanceOf(PerishablesDAO);
        const itemQty = await instance.getItemQuantity('meat');
        expect(itemQty).toBeDefined();
    });

    it('should get the earliest expiry date of an item in stock based on the item name if item already exists in the db', async () => {
        expect(instance).toBeDefined();
        expect(instance.getItemMinExpiry).toBeDefined();

        expect(instance).toBeInstanceOf(PerishablesDAO);
        const itemExp = await instance.getItemMinExpiry('meat');
        expect(itemExp).toBeDefined();
    });

    it('should add a new item', async () => {
        expect(instance).toBeDefined();
        expect(instance.addItem).toBeDefined();

        expect(instance).toBeInstanceOf(PerishablesDAO);
        const res = await instance.addItem({
            name: 'potatoe',
            quantity: 10,
            expiry: 1640991600000
        });
        expect(res).toBeDefined();
    });

    it('should sell an existing item', async () => {
        expect(instance).toBeDefined();
        expect(instance.sellItem).toBeDefined();

        expect(instance).toBeInstanceOf(PerishablesDAO);
        const res = await instance.sellItem({
            name: 'potatoe',
            quantity: 2,
        });
        expect(res).toBeDefined();
    });

    it('should delete expired stocks', async () => {
        expect(instance).toBeDefined();
        expect(instance.deleteExpiredStocks).toBeDefined();

        expect(instance).toBeInstanceOf(PerishablesDAO);
        const res = await instance.deleteExpiredStocks();
        expect(res).toBeDefined();
    });

})