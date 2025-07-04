'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('logs', {
      id:        { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      model:     Sequelize.STRING,
      record_id: Sequelize.BIGINT,
      user_id:   { type: Sequelize.BIGINT, references: { model: 'users', key: 'id' } },
      action:    Sequelize.STRING,
      old_data:  Sequelize.JSON,          // ← JSON en vez de JSONB
      new_data:  Sequelize.JSON,          // ← JSON
      ts:        { type: Sequelize.DATE, defaultValue: Sequelize.NOW } // ← compatible MySQL
    }),

  down: (queryInterface) => queryInterface.dropTable('logs')
};
