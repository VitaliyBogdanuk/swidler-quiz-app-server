'use strict';

const phoneDescriptionsData = require('../data/phoneDescriptions.json');
const tableName = 'PhoneDescriptions';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(tableName, phoneDescriptionsData, { returning: true });
    // Set autoincrement initial value after seeding
    const result = await queryInterface.sequelize.query(`SELECT * from "${tableName}" ORDER BY id DESC LIMIT 1; `);
    const sequenceName = '"PhoneDescriptions_id_seq"';
    const restartWith = Number(result[0][0].id) + 1;
    await queryInterface.sequelize.query(`SELECT setval('${sequenceName}', ${restartWith}, false);`);

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(tableName, null, {});
  }
};
