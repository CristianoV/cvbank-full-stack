import {  INTEGER, Model, DATE } from 'sequelize';
import db from './index.js';
import User from './user.js';

class Transaction extends Model {
  public id!: number;
  public debitedAccountId!: number;
  public creditedAccountId!: number;
  public value!: number;
  public createdAt!: Date;

}

Transaction.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  debitedAccountId: {
    type: INTEGER,
    allowNull: false,
    references: { model: 'Accounts', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  creditedAccountId: {
    type: INTEGER,
    allowNull: false,
    references: { model: 'Accounts', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  value: {
    type: INTEGER
  },
  createdAt: {
    type: DATE,
  },
}, {
  sequelize: db,
  modelName: 'Transactions',
  updatedAt: false,
});

// Transaction.belongsTo(Account, { as: 'debitedAccount', foreignKey: 'debitedAccountId' });
// Transaction.belongsTo(Account, { as: 'creditedAccount', foreignKey: 'creditedAccountId' });
Transaction.belongsTo(User, { as: 'debitedUser', foreignKey: 'debitedAccountId' });
Transaction.belongsTo(User, { as: 'creditedUser', foreignKey: 'creditedAccountId' });


export default Transaction;
