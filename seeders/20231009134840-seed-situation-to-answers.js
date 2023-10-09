'use strict';

const situationToAnswersData = require('../data/situationToAnswers.json');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('SituationToAnswers', situationToAnswersData, { returning: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SituationToAnswers', null, {});
  }
};
