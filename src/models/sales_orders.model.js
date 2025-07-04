// 📂 api/src/models/sales_orders.model.js
import { DataTypes, Model } from 'sequelize';
export default (sequelize) => {
  class SalesOrders extends Model {}
  SalesOrders.init(
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      userId: { type: DataTypes.BIGINT, field: 'user_id' },
      patientName: { type: DataTypes.STRING, field: 'patient_name' },
      patientAge: { type: DataTypes.SMALLINT, field: 'patient_age' },
      patientGender: { type: DataTypes.CHAR, field: 'patient_gender' },
      quantity: DataTypes.SMALLINT,
      totalPrice: { type: DataTypes.DECIMAL, field: 'total_price' },
      status: DataTypes.CHAR,
      notes: DataTypes.TEXT,
      costCenterId: { type: DataTypes.BIGINT, field: 'cost_center_id' },
      createdBy: { type: DataTypes.BIGINT, field: 'created_by' },
      updatedBy: { type: DataTypes.BIGINT, field: 'updated_by' },
      deletedAt: { type: DataTypes.DATE, field: 'deleted_at' },
      createdAt: { type: DataTypes.DATE, field: 'created_at' },
      updatedAt: { type: DataTypes.DATE, field: 'updated_at' }
    },
    { sequelize, modelName: 'sales_orders', underscored: true, paranoid: true }
  );
  return SalesOrders;
};