// migrations/20250703100009-create-sales-order-projections.js
'use strict';
module.exports  = {
  up: (qi, Sequelize) =>
    qi.createTable('sales_order_projections', {
      sales_order_id: { type: Sequelize.BIGINT, primaryKey: true, references:{ model:'sales_orders', key:'id' } },
      projection_id:  { type: Sequelize.BIGINT, primaryKey: true, references:{ model:'projections', key:'id' } }
    }),
  down: (qi) => qi.dropTable('sales_order_projections')
};
