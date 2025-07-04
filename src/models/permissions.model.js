// 📂 api/src/models/permissions.model.js
import { DataTypes, Model } from 'sequelize';
export default (sequelize) => {
  class Permissions extends Model {}
  Permissions.init(
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      resource: { type: DataTypes.STRING, allowNull: false },
      action: { type: DataTypes.STRING, allowNull: false },
      code: { type: DataTypes.STRING, unique: true, allowNull: false },
      description: DataTypes.TEXT,
      createdAt: { type: DataTypes.DATE, field: 'created_at' },
      updatedAt: { type: DataTypes.DATE, field: 'updated_at' }
    },
    { sequelize, modelName: 'permissions', underscored: true }
  );
  return Permissions;
};