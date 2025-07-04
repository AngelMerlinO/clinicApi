// migrations/20250703100005-create-user-permissions.js
'use strict';
module.exports = {
  up: (qi, Sequelize) =>
    qi.createTable('user_permissions', {
      user_id:       { type: Sequelize.BIGINT, primaryKey: true, references:{ model:'users', key:'id' } },
      permission_id: { type: Sequelize.BIGINT, primaryKey: true, references:{ model:'permissions', key:'id' } }
    }),
  down: (qi) => qi.dropTable('user_permissions')
};
