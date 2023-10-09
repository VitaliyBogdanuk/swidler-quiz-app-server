'use strict';

const achievementsData = require('../data/achievements.json');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Achievements', achievementsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Achievements', null, {});
  }
};
