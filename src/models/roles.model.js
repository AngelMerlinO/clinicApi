// api/src/models/roles.model.js
import { DataTypes, Model } from 'sequelize';
export default (sequelize) => {
  class Roles extends Model {}
  Roles.init({
    id:          { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name:        { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT
  }, { sequelize, modelName: 'roles', underscored:true });
  return Roles;
};
