import { Model, Sequelize, DataTypes } from 'sequelize';
import database from '../utils/connect'

export default class Perishable extends Model {
  public id?: number;
  public name!: string;
  public quantity!: number;
  public expiry!: number;
}

// export const PerishableMap = (sequelize: Sequelize) => {
  Perishable.init({
    
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    expiry: {
      type: DataTypes.BIGINT
    }


  }, {
    sequelize: database,
    paranoid: true, //soft deletes
  });
  
  Perishable.sync();
// }