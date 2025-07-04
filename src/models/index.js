// api/src/models/index.js
import { Sequelize } from 'sequelize';
import dbConfig from '../config/config.cjs';

import defineRoles                  from './roles.model.js';
import defineUsers                  from './users.model.js';
import definePermissions            from './permissions.model.js';
import defineRolePermissions        from './role_permissions.model.js';
import defineUserPermissions        from './user_permissions.model.js';
import defineCostCenters            from './cost_centers.model.js';
import defineProjections            from './projections.model.js';
import defineSalesOrders            from './sales_orders.model.js';
import defineSalesOrderProjections  from './sales_order_projections.model.js';
import defineLogs                   from './logs.model.js';
import defineRefreshTokens          from './refresh_tokens.model.js';

const sequelize = new Sequelize(dbConfig.development);

const Roles                  = defineRoles(sequelize);
const Users                  = defineUsers(sequelize);
const Permissions            = definePermissions(sequelize);
const RolePermissions        = defineRolePermissions(sequelize);
const UserPermissions        = defineUserPermissions(sequelize);
const CostCenters            = defineCostCenters(sequelize);
const Projections            = defineProjections(sequelize);
const SalesOrders            = defineSalesOrders(sequelize);
const SalesOrderProjections  = defineSalesOrderProjections(sequelize);
const Logs                   = defineLogs(sequelize);
const RefreshTokens          = defineRefreshTokens(sequelize);

// Model associations
Roles.hasMany(Users);
Users.belongsTo(Roles);

// Pivot associations for permissions
RolePermissions.belongsTo(Permissions, { foreignKey: 'permission_id', as: 'permission' });
Permissions.hasMany(RolePermissions, { foreignKey: 'permission_id', as: 'rolePermissions' });

UserPermissions.belongsTo(Permissions, { foreignKey: 'permission_id', as: 'permission' });
Permissions.hasMany(UserPermissions, { foreignKey: 'permission_id', as: 'userPermissions' });

// Many-to-many through pivot tables
Roles.belongsToMany(Permissions, { through: RolePermissions, foreignKey: 'role_id', otherKey: 'permission_id' });
Permissions.belongsToMany(Roles, { through: RolePermissions, foreignKey: 'permission_id', otherKey: 'role_id' });

Users.belongsToMany(Permissions, { through: UserPermissions, foreignKey: 'user_id', otherKey: 'permission_id' });
Permissions.belongsToMany(Users, { through: UserPermissions, foreignKey: 'permission_id', otherKey: 'user_id' });

// Sales Orders associations
Users.hasMany(SalesOrders);
SalesOrders.belongsTo(Users);

CostCenters.hasMany(SalesOrders);
SalesOrders.belongsTo(CostCenters);

SalesOrders.belongsToMany(Projections, { through: SalesOrderProjections, foreignKey: 'sales_order_id', otherKey: 'projection_id' });
Projections.belongsToMany(SalesOrders, { through: SalesOrderProjections, foreignKey: 'projection_id', otherKey: 'sales_order_id' });

// Logs associations
Users.hasMany(Logs);
Logs.belongsTo(Users);

// Refresh token associations
Users.hasMany(RefreshTokens, { foreignKey: 'user_id' });
RefreshTokens.belongsTo(Users, { foreignKey: 'user_id' });

export {
  sequelize,
  Roles,
  Users,
  Permissions,
  RolePermissions,
  UserPermissions,
  CostCenters,
  Projections,
  SalesOrders,
  SalesOrderProjections,
  Logs,
  RefreshTokens
};

export default {
  sequelize,
  Roles,
  Users,
  Permissions,
  RolePermissions,
  UserPermissions,
  CostCenters,
  Projections,
  SalesOrders,
  SalesOrderProjections,
  Logs,
  RefreshTokens
};
