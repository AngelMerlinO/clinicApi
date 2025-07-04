// 📂 api/src/models/user_permissions.model.js
import { DataTypes, Model } from 'sequelize';
export default (sequelize) => {
  class UserPermissions extends Model {}
  UserPermissions.init(
    {
      userId: { type: DataTypes.BIGINT, primaryKey: true, field: 'user_id' },
      permissionId: { type: DataTypes.BIGINT, primaryKey: true, field: 'permission_id' }
    },
    { sequelize, modelName: 'user_permissions', underscored: true, timestamps: false }
  );
  return UserPermissions;
};