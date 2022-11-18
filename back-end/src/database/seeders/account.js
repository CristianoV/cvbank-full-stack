module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Accounts', [
      {
        id: 999,
        balance: 20000,
      },
      {
        id: 998,
        balance: 10000,
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Accounts', null, {});
  },
};