// 📂 api/src/models/cost_centers.model.js
import { DataTypes, Model } from 'sequelize';
export default (sequelize) => {
  class CostCenters extends Model {}
  CostCenters.init(
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      location: DataTypes.STRING,
      phone: DataTypes.STRING,
      prefix: DataTypes.STRING,
      contactEmail: { type: DataTypes.STRING, field: 'contact_email' },
      isActive: { type: DataTypes.BOOLEAN, field: 'is_active', defaultValue: true },
      deletedAt: { type: DataTypes.DATE, field: 'deleted_at' },
      createdAt: { type: DataTypes.DATE, field: 'created_at' },
      updatedAt: { type: DataTypes.DATE, field: 'updated_at' }
    },
    { sequelize, modelName: 'cost_centers', underscored: true, paranoid: true }
  );
  return CostCenters;
};
