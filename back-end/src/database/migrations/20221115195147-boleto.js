'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Boletos',
      {
        id: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        boletoId: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        accountId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          foreignKey: true,
          references: { model: 'Accounts', key: 'id' },
        },
        value: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        status: {
          type: Sequelize.ENUM('Pendente', 'Pago', 'Cancelado'),
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATEONLY,
        },
      },
      {
        updatedAt: false,
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Boletos');
  },
};
