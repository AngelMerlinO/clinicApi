// migrations/20250703100007-create-projections.js
'use strict';
module.exports = {
  up: (qi, Sequelize) =>
    qi.createTable('projections', {
      id:        { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      name:      { type: Sequelize.STRING, allowNull: false },
      price:     { type: Sequelize.DECIMAL, allowNull: false },
      is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
      created_at:{ type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      created_by:{ type: Sequelize.BIGINT, references:{ model:'users', key:'id' } },
      updated_at:{ type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updated_by:{ type: Sequelize.BIGINT },
      deleted_at:Sequelize.DATE
    }),
  down: (qi) => qi.dropTable('projections')
};
