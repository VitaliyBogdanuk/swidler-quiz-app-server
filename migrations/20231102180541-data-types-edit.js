'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.changeColumn('Situations', 'question', {
        type: Sequelize.STRING(2000)
      }, { transaction: transaction });
      await queryInterface.changeColumn('Situations', 'wrongAnswerDescription', {
        type: Sequelize.STRING(2000)
      }, { transaction: transaction });
      await transaction.commit()
    } catch (error) {
      return error
    }
  },
  down: async (queryInterface, Sequelize) => {
  }
};
