// api/src/models/users.model.js
import { DataTypes, Model } from 'sequelize';
export default (sequelize) => {
  class Users extends Model {}
  Users.init({
    id:            { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    fullName:      { type: DataTypes.STRING, field:'full_name' },
    email:         { type: DataTypes.STRING, unique:true },
    passwordHash:  { type: DataTypes.STRING, field:'password_hash' },
    roleId:        { type: DataTypes.BIGINT, field:'role_id' },
    isActive:      { type: DataTypes.BOOLEAN, field:'is_active', defaultValue:true },
    deletedAt:     { type: DataTypes.DATE, field:'deleted_at' }
  }, { sequelize, modelName:'users', underscored:true, paranoid:true });
  return Users;
};
