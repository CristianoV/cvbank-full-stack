module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Users', [
      {
        id: 999,
        username: 'CristianoV',
        password: '$2a$10$0ec80axjF54kPvZW5KRmSuQjCGK8P7vqJdoTY7KmUJ8NRzcX2v7pS',
        accountId: 999,
      },
      {
        id: 998,
        username: 'CintiaS',
        password: '$2a$10$0ec80axjF54kPvZW5KRmSuQjCGK8P7vqJdoTY7KmUJ8NRzcX2v7pS',
        accountId: 998,
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};