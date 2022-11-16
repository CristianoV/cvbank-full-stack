module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'CristianoV',
        password: '$2a$10$0ec80axjF54kPvZW5KRmSuQjCGK8P7vqJdoTY7KmUJ8NRzcX2v7pS',
        accountId: 1,
      },
      {
        username: 'CintiaS',
        password: '$2a$10$0ec80axjF54kPvZW5KRmSuQjCGK8P7vqJdoTY7KmUJ8NRzcX2v7pS',
        accountId: 2,
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};