'use strict';

const topicsData = require('../data/topics.json');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Topics', topicsData, { returning: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Topics', null, {});
  }
};
