'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // queryInterface.addColumn('Users', 'firstName', { type: DataTypes.STRING });
    // queryInterface.addColumn('Users', 'lastName', { type: DataTypes.STRING });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
