module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Accounts', [
      {
        balance: 1000,
      },
      {
        balance: 500,
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Accounts', null, {});
  },
};