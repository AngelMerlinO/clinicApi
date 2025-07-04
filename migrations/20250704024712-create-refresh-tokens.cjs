'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('refresh_tokens', {
      id:         { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      user_id:    { type: Sequelize.BIGINT, allowNull: false, references:{ model:'users', key:'id' } },
      token_hash: { type: Sequelize.STRING, allowNull: false },
      expires_at: { type: Sequelize.DATE,   allowNull: false }
    });
  },
  down: (qi) => qi.dropTable('refresh_tokens')
};
