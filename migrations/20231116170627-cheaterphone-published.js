'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('CheaterPhones', 'published', {
      type: Sequelize.DataTypes.BOOLEAN
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('CheaterPhones', 'published');
  }
};
