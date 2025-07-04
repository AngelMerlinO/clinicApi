// 📂 api/src/models/sales_order_projections.model.js
import { DataTypes, Model } from 'sequelize';
export default (sequelize) => {
  class SalesOrderProjections extends Model {}
  SalesOrderProjections.init(
    {
      salesOrderId: { type: DataTypes.BIGINT, primaryKey: true, field: 'sales_order_id' },
      projectionId: { type: DataTypes.BIGINT, primaryKey: true, field: 'projection_id' }
    },
    { sequelize, modelName: 'sales_order_projections', underscored: true, timestamps: false }
  );
  return SalesOrderProjections;
};