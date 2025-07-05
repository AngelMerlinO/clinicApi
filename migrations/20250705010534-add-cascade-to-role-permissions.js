'use strict';

module.exports = {
  up: async (qi, Sequelize) => {
    // 1) Elimina la constraint existente
    await qi.removeConstraint('role_permissions', 'role_permissions_ibfk_1');

    // 2) Vuelve a crearla con CASCADE
    await qi.addConstraint('role_permissions', {
      fields: ['role_id'],
      type: 'foreign key',
      name: 'role_permissions_ibfk_1',
      references: {
        table: 'roles',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  down: async (qi, Sequelize) => {
    await qi.removeConstraint('role_permissions', 'role_permissions_ibfk_1');
    await qi.addConstraint('role_permissions', {
      fields: ['role_id'],
      type: 'foreign key',
      name: 'role_permissions_ibfk_1',
      references: {
        table: 'roles',
        field: 'id'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    });
  }
};
