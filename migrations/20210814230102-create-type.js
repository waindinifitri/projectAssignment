'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('type', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      typeName: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.STRING
      },
      blockers: {
        type: Sequelize.TEXT
      },
      actual_start: {
        type: Sequelize.STRING
      },
      actual_finish: {
        type: Sequelize.STRING
      },
      source: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('type');
  }
};
