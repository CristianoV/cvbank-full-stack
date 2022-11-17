import {  INTEGER, Model } from 'sequelize';
import db from '.';

class Account extends Model {
  public id!: number;
  public balance!: number;
}

Account.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  balance: {
    type: INTEGER
  },
}, {
  sequelize: db,
  modelName: 'Accounts',
  timestamps: false,
});

export default Account;