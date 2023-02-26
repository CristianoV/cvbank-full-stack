module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Accounts', [
      {
        id: 999,
        balance: 1000000000,
        pixKey: '123456789',
      },
      {
        id: 998,
        balance: 1000,
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Accounts', null, {});
  },
};