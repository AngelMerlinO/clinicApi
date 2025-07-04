// migrations/20250703100004-create-role-permissions.js
'use strict';
module.exports = {
  up: (qi, Sequelize) =>
    qi.createTable('role_permissions', {
      role_id:       { type: Sequelize.BIGINT, primaryKey: true, references:{ model:'roles', key:'id' } },
      permission_id: { type: Sequelize.BIGINT, primaryKey: true, references:{ model:'permissions', key:'id' } }
    }),
  down: (qi) => qi.dropTable('role_permissions')
};
