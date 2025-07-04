// 📂 api/src/models/projections.model.js
import { DataTypes, Model } from 'sequelize';
export default (sequelize) => {
  class Projections extends Model {}
  Projections.init(
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.DECIMAL, allowNull: false },
      isActive: { type: DataTypes.BOOLEAN, field: 'is_active', defaultValue: true },
      createdBy: { type: DataTypes.BIGINT, field: 'created_by' },
      updatedBy: { type: DataTypes.BIGINT, field: 'updated_by' },
      deletedAt: { type: DataTypes.DATE, field: 'deleted_at' },
      createdAt: { type: DataTypes.DATE, field: 'created_at' },
      updatedAt: { type: DataTypes.DATE, field: 'updated_at' }
    },
    { sequelize, modelName: 'projections', underscored: true, paranoid: true }
  );
  return Projections;
};
