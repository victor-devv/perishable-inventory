import { Model, Sequelize, DataTypes } from 'sequelize';
import database from '../utils/connect'
import Perishable from './perishable.model';

export default class Stock extends Model {
  public id?: number;
  public PerishableId!: number;
  public quantity!: number;
  public expiry!: number;
}

Stock.init({
  
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },

  PerishableId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
        model: 'Perishables',
        key: "id"
    }
  },

  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  
  expiry: {
    type: DataTypes.BIGINT,
    allowNull: false,
  }

}, {
  sequelize: database,
  paranoid: true, //soft deletes
});

    // Perishable.hasMany(Stock);

Stock.sync();

