'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn('PhoneDescriptions', 'approved', {
      type: Sequelize.DataTypes.BOOLEAN
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn('PhoneDescriptions', 'approved');
  }
};
