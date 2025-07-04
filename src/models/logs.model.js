// 📂 api/src/models/logs.model.js
import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
  class Logs extends Model {}

  Logs.init(
    {
      id:        { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      model:     DataTypes.STRING,
      recordId:  { type: DataTypes.BIGINT, field: 'record_id' },
      userId:    { type: DataTypes.BIGINT, field: 'user_id' },
      action:    DataTypes.STRING,
      oldData:   { type: DataTypes.JSON, field: 'old_data' },  // ← JSON
      newData:   { type: DataTypes.JSON, field: 'new_data' },  // ← JSON
      ts:        { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    },
    {
      sequelize,
      modelName: 'logs',
      underscored: true,
      timestamps: false
    }
  );

  return Logs;
};
