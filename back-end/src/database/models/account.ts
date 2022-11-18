import {  INTEGER, Model } from 'sequelize';
import db from '.';
import User from './user';

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
    references: { model: 'Users', key: 'accountId' },
  },
  balance: {
    type: INTEGER
  },
}, {
  sequelize: db,
  modelName: 'Accounts',
  timestamps: false,
});

Account.belongsTo(User, { as: 'user', foreignKey: 'id' });

export default Account;