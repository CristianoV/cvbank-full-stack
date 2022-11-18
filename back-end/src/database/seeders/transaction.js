module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Transactions', [
      {
        debitedAccountId: 999,
        creditedAccountId: 998,
        value: 100,
        createdAt: new Date(),
      },
      {
        debitedAccountId: 998,
        creditedAccountId: 999,
        value: 200,
        createdAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Transactions', null, {});
  },
};