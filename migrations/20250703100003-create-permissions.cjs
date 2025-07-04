// migrations/20250703100003-create-permissions.js
'use strict';
module.exports = {
  up: (qi, Sequelize) =>
    qi.createTable('permissions', {
      id:          { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      resource:    { type: Sequelize.STRING, allowNull: false },
      action:      { type: Sequelize.STRING, allowNull: false },
      code:        { type: Sequelize.STRING, allowNull: false, unique: true },
      description: Sequelize.TEXT,
      created_at:  { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updated_at:  { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }
    }),
  down: (qi) => qi.dropTable('permissions')
};
