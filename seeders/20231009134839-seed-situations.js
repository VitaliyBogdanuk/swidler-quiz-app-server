'use strict';

const situationsData = require('../data/situations.json');
const tableName = 'Situations';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(tableName, situationsData, { returning: true });
    // Set autoincrement initial value after seeding
    const result = await queryInterface.sequelize.query(`SELECT COUNT(*) from "${tableName}";`);
    const sequenceName = '"Situations_id_seq"';
    const restartWith = Number(result[0][0].count) + 1;
    await queryInterface.sequelize.query(`SELECT setval('${sequenceName}', ${restartWith}, false);`);

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(tableName, null, {});
  }
};
