import {  INTEGER, Model, DECIMAL } from 'sequelize';
import db from '.';

class Account extends Model {}

Account.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  balance: {
    type: DECIMAL
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Accounts',
  timestamps: false,
});

export default Account;