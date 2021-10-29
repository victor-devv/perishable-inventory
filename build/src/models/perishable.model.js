"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connect_1 = __importDefault(require("../utils/connect"));
const stock_model_1 = __importDefault(require("./stock.model"));
class Perishable extends sequelize_1.Model {
}
exports.default = Perishable;
// export const PerishableMap = (sequelize: Sequelize) => {
Perishable.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize: connect_1.default,
    paranoid: true, //soft deletes
});
stock_model_1.default.belongsTo(Perishable, { targetKey: "id" });
Perishable.hasMany(stock_model_1.default, {
    sourceKey: "id",
    foreignKey: "PerishableId",
    as: "stocks", // this determines the name in `associations`!
});
Perishable.sync();
// }
// quantity: {
//   type: DataTypes.INTEGER
// },
// expiry: {
//   type: DataTypes.BIGINT
// }
