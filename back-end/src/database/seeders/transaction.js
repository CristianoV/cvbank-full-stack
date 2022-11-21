module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Transactions',
      [
        {
          debitedAccountId: 998,
          creditedAccountId: 999,
          value: 1000000000,
          createdAt: '2022-01-01T23:21:03.639Z',
        },
        {
          debitedAccountId: 999,
          creditedAccountId: 998,
          value: 770000000,
          createdAt: '2022-01-01T23:21:03.639Z',
        },
        {
          debitedAccountId: 998,
          creditedAccountId: 999,
          value: 1000000000,
          createdAt: '2022-01-01T23:21:03.639Z',
        },
        {
          debitedAccountId: 998,
          creditedAccountId: 999,
          value: 150,
          createdAt: '2022-01-01T23:21:03.639Z',
        },
        {
          debitedAccountId: 998,
          creditedAccountId: 999,
          value: 100,
          createdAt: '2022-01-01T23:21:03.639Z',
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Transactions', null, {});
  },
};
