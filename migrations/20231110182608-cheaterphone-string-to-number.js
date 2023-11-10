'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('CheaterPhones', 'phone', {
      type: 'BIGINT USING CAST("phone" as BIGINT)'
});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('CheaterPhones', 'phone', {
      type: Sequelize.STRING
    });
  }
};
