// migrations/20250703100006-create-cost-centers.js
'use strict';
module.exports = {
  up: (qi, Sequelize) =>
    qi.createTable('cost_centers', {
      id:            { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      name:          { type: Sequelize.STRING, allowNull: false },
      location:      Sequelize.STRING,
      phone:         Sequelize.STRING,
      prefix:        Sequelize.STRING,
      contact_email: Sequelize.STRING,
      is_active:     { type: Sequelize.BOOLEAN, defaultValue: true },
      created_at:    { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updated_at:    { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      deleted_at:    Sequelize.DATE
    }),
  down: (qi) => qi.dropTable('cost_centers')
};
