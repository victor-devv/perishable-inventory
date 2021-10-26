import { 
    Model, 
    ModelDefined,
    Sequelize, 
    DataTypes,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    Association,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    Optional,
} from 'sequelize';
import database from '../utils/connect'
import Stock from './stock.model'

export default class Perishable extends Model {
    public id?: number;
    public name!: string;
    public quantity!: number;
    public expiry!: number;

    public getStocks!: HasManyGetAssociationsMixin<Stock>; 
    public addStock!: HasManyAddAssociationMixin<Stock, number>;
    public hasStock!: HasManyHasAssociationMixin<Stock, number>;
    public countStocks!: HasManyCountAssociationsMixin;
    public createStock!: HasManyCreateAssociationMixin<Stock>;

    public readonly stocks?: Stock[];

    public static associations: {
        stocks: Association<Perishable, Stock>;
    };
}

// export const PerishableMap = (sequelize: Sequelize) => {
Perishable.init({

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }

}, {
sequelize: database,
paranoid: true, //soft deletes
});

Stock.belongsTo(Perishable, { targetKey: "id" });

Perishable.hasMany(Stock, {
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
