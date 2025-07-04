// 📂 api/src/models/role_permissions.model.js
import { DataTypes, Model } from 'sequelize';
export default (sequelize) => {
  class RolePermissions extends Model {}
  RolePermissions.init(
    {
      roleId: { type: DataTypes.BIGINT, primaryKey: true, field: 'role_id' },
      permissionId: { type: DataTypes.BIGINT, primaryKey: true, field: 'permission_id' }
    },
    { sequelize, modelName: 'role_permissions', underscored: true, timestamps: false }
  );
  return RolePermissions;
};