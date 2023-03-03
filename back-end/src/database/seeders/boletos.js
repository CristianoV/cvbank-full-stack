module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Boletos',
      [
        {
          accountId: 999,
          value: 300000000,
          status: 'Pendente',
          boletoId: '123456789',
          createdAt: '2022-01-01T23:21:03.639Z',
        },
        {
          accountId: 998,
          value: 1300000000,
          status: 'Pago',
          boletoId: '123456788',
          createdAt: '2022-01-01T23:21:03.639Z',
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Boletos', null, {});
  },
};
