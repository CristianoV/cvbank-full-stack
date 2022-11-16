'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Accounts',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        balance: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        timestamps: false,
      });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('Accounts');
  }
};
