'use strict';

const userToTopicsData = require('../data/userToTopics.json');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('UserToTopics', userToTopicsData, { returning: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserToTopics', null, {});
  }
};
