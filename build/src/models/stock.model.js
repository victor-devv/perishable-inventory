"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connect_1 = __importDefault(require("../utils/connect"));
class Stock extends sequelize_1.Model {
}
exports.default = Stock;
Stock.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    PerishableId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Perishables',
            key: "id"
        }
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    expiry: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    }
}, {
    sequelize: connect_1.default,
    paranoid: true, //soft deletes
});
// Perishable.hasMany(Stock);
Stock.sync();
