import { INTEGER, Model, DATEONLY, ENUM, BIGINT, STRING } from 'sequelize';
import db from '.';
import User from './user';

class Boletos extends Model {
  public id!: number;
  public boletoId!: string;
  public accountId!: number;
  public value!: number;
  public status!: string;
  public createdAt!: Date;
  user: any;
}

Boletos.init(
  {
    id: {
      type: BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    boletoId: {
      type: STRING,
      allowNull: false,
    },
    accountId: {
      type: INTEGER,
      allowNull: false,
      references: { model: 'Accounts', key: 'id' },
    },
    value: {
      type: INTEGER,
    },
    status: {
      type: ENUM('Pendente', 'Pago', 'Cancelado'),
    },
    createdAt: {
      type: DATEONLY,
    },
  },
  {
    sequelize: db,
    modelName: 'Boletos',
    updatedAt: false,
  }
);

Boletos.belongsTo(User, {
  as: 'user',
  foreignKey: 'accountId',
});

export default Boletos;
