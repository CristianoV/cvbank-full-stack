'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Transactions',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        debitedAccountId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          foreignKey: true,
          references: { model: 'Accounts', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        creditedAccountId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          foreignKey: true,
          references: { model: 'Accounts', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        value: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
        },
      },
      {
        updatedAt: false,
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Transactions');
  },
};
