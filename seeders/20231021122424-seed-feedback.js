'use strict';

const FeedbacksData = require('../data/feedbacks.json');
const tableName = 'Feedbacks';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(tableName, FeedbacksData, { returning: true });
    // Set autoincrement initial value after seeding
    const result = await queryInterface.sequelize.query(`
    SELECT * from "${tableName}"
    ORDER BY id DESC
    LIMIT 1;
    `);
    const sequenceName = '"Feedbacks_id_seq"';
    const restartWith = Number(result[0][0].id) + 1;
    await queryInterface.sequelize.query(`SELECT setval('${sequenceName}', ${restartWith}, false);`);

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(tableName, null, {});
  }
};