'use strict';

const userToNumbersData = require('../data/userToNumbers.json');
const tableName = 'UserToNumbers';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(tableName, userToNumbersData, { returning: true });
    // Set autoincrement initial value after seeding
    const result = await queryInterface.sequelize.query(`SELECT COUNT(*) from "${tableName}";`);
    const sequenceName = '"UserToNumbers_id_seq"';
    const restartWith = Number(result[0][0].count) + 1;
    await queryInterface.sequelize.query(`SELECT setval('${sequenceName}', ${restartWith}, false);`);

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(tableName, null, {});
  }
};
