'use strict';

const badNumbersData = require('../data/badNumbers.json');
const tableName = 'BadNumbers';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(tableName, badNumbersData, { returning: true });
    // Set autoincrement initial value after seeding
    const result = await queryInterface.sequelize.query(`SELECT COUNT(*) from "${tableName}";`);
    const sequenceName = '"BadNumbers_id_seq"';
    const restartWith = Number(result[0][0].count) + 1;
    await queryInterface.sequelize.query(`SELECT setval('${sequenceName}', ${restartWith}, false);`);

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(tableName, null, {});
  }
};
