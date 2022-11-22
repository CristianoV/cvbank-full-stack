import {  INTEGER, Model, DATEONLY } from 'sequelize';
import db from '.';
import User from './user';

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
    type: DATEONLY,
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
