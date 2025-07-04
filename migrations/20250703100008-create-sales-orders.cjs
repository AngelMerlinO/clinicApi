// migrations/20250703100008-create-sales-orders.js
'use strict';
module.exports = {
  up: (qi, Sequelize) =>
    qi.createTable('sales_orders', {
      id:             { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      user_id:        { type: Sequelize.BIGINT, references:{ model:'users', key:'id' } },
      patient_name:   Sequelize.STRING,
      patient_age:    Sequelize.SMALLINT,
      patient_gender: Sequelize.CHAR,
      quantity:       Sequelize.SMALLINT,
      total_price:    Sequelize.DECIMAL,
      status:         Sequelize.CHAR,
      notes:          Sequelize.TEXT,
      cost_center_id: { type: Sequelize.BIGINT, references:{ model:'cost_centers', key:'id' } },
      created_at:     { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      created_by:     Sequelize.BIGINT,
      updated_at:     { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updated_by:     Sequelize.BIGINT,
      deleted_at:     Sequelize.DATE
    }),
  down: (qi) => qi.dropTable('sales_orders')
};
