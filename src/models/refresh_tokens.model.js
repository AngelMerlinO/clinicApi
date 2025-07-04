// api/src/models/refresh_tokens.model.js
import { DataTypes, Model } from 'sequelize';
export default (sequelize) => {
  class RefreshTokens extends Model {}
  RefreshTokens.init(
    {
      id:        { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      userId:    { type: DataTypes.BIGINT, field: 'user_id' },
      tokenHash: { type: DataTypes.STRING, field: 'token_hash' },
      expiresAt: { type: DataTypes.DATE, field: 'expires_at' }
    },
    {
      sequelize,
      modelName: 'refresh_tokens',
      underscored: true,
      timestamps: false   // ← desactiva los createdAt / updatedAt
    }
  );
  return RefreshTokens;
};
