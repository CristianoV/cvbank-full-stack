import {  INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class User extends Model {}

User.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  accountId: {
    type: INTEGER,
    allowNull: false,
    references: { model: 'Accounts', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Accounts',
  timestamps: false,
});

export default User;