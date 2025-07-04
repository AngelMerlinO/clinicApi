// migrations/20250703100001-create-roles.js
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('roles', {
      id:          { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      name:        { type: Sequelize.STRING, allowNull: false },
      description: Sequelize.TEXT,
      created_at:  { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updated_at:  { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }
    });
  },
  down: (qi) => qi.dropTable('roles')
};
