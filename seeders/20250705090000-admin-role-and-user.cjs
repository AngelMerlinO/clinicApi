'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();

    /* 1️⃣  Seed permissions if table is empty */
    const [{ count }] = await queryInterface.sequelize.query(
      'SELECT COUNT(*) AS count FROM permissions',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (+count === 0) {
      const resources = [
        'users',
        'roles',
        'permissions',
        'cost_centers',
        'sales_orders',
        'projections',
        'logs'
      ];
      const actions = ['create', 'read', 'update', 'delete'];
      const perms = [];

      resources.forEach(resource => {
        actions.forEach(action => {
          perms.push({
            resource,
            action,
            code:        `${resource}:${action}`,
            description: `${action} ${resource}`,
            created_at:  now,
            updated_at:  now
          });
        });
      });

      await queryInterface.bulkInsert('permissions', perms);
    }

    /* 2️⃣  Create Admin role */
    await queryInterface.bulkInsert(
      'roles',
      [{ name: 'Admin', description: 'Superuser', created_at: now, updated_at: now }]
    );

    const [{ id: roleId }] = await queryInterface.sequelize.query(
      "SELECT id FROM roles WHERE name = 'Admin' LIMIT 1",
      { type: Sequelize.QueryTypes.SELECT }
    );

    /* 3️⃣  Create Administrator user */
    await queryInterface.bulkInsert('users', [{
      full_name:     'Administrator',
      email:         'admin@example.com',
      password_hash: '$2b$10$sHaBd0ebD9WZdn3mr8XCwOyfsAi0S3DTiJGwFsDKQ6GyuCTYw1tH2',
      role_id:       roleId,
      is_active:     true,
      created_at:    now,
      updated_at:    now
    }]);

    /* 4️⃣  Grant every permission to Admin role */
    const permissions = await queryInterface.sequelize.query(
      'SELECT id FROM permissions',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (permissions.length) {
      const junctionRows = permissions.map(p => ({
        role_id: roleId,
        permission_id: p.id
      }));
      await queryInterface.bulkInsert('role_permissions', junctionRows);
    }
  },

  down: async (queryInterface, Sequelize) => {
    const [{ id: roleId } = {}] = await queryInterface.sequelize.query(
      "SELECT id FROM roles WHERE name = 'Admin' LIMIT 1",
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (roleId) {
      await queryInterface.bulkDelete('role_permissions', { role_id: roleId });
      await queryInterface.bulkDelete('users',          { role_id: roleId });
      await queryInterface.bulkDelete('roles',          { id: roleId });
    }

    // (optional) remove seeded permissions only if you want a full rollback
    // await queryInterface.bulkDelete('permissions', null, {});
  }
};
