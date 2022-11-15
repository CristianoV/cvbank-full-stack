import {  INTEGER, Model, DECIMAL } from 'sequelize';
import db from './index.js';

class Transaction extends Model {}

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
    foreignKey: true,
    references: { model: 'Accounts', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  creditedAccountId: {
    type: INTEGER,
    allowNull: false,
    foreignKey: true,
    references: { model: 'Accounts', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  value: {
    type: DECIMAL
  },
  createdAt: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Accounts',
  timestamps: false,
});

export default Transaction;
