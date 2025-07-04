// migrations/20250703100002-create-users.js
'use strict';
module.exports = {
  up: (qi, Sequelize) =>
    qi.createTable('users', {
      id:            { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      full_name:     { type: Sequelize.STRING, allowNull: false },
      email:         { type: Sequelize.STRING, allowNull: false, unique: true },
      password_hash: Sequelize.STRING,
      role_id:       { type: Sequelize.BIGINT, references:{ model:'roles', key:'id' } },
      is_active:     { type: Sequelize.BOOLEAN, defaultValue: true },
      created_at:    { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updated_at:    { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      deleted_at:    Sequelize.DATE
    }),
  down: (qi) => qi.dropTable('users')
};
