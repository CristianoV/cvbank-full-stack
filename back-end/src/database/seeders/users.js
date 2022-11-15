module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'CristianoV',
        password: '123456',
        accountId: 1,
      },
      {
        username: 'CintiaS',
        password: '123456',
        accountId: 2,
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};