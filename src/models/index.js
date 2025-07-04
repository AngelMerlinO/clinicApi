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

// Associations
Roles.hasMany(Users);
Users.belongsTo(Roles);

Roles.belongsToMany(Permissions, { through: RolePermissions });
Permissions.belongsToMany(Roles, { through: RolePermissions });

Users.belongsToMany(Permissions, { through: UserPermissions });
Permissions.belongsToMany(Users, { through: UserPermissions });

Users.hasMany(SalesOrders);
SalesOrders.belongsTo(Users);

CostCenters.hasMany(SalesOrders);
SalesOrders.belongsTo(CostCenters);

SalesOrders.belongsToMany(Projections, { through: SalesOrderProjections });
Projections.belongsToMany(SalesOrders, { through: SalesOrderProjections });

Users.hasMany(Logs);
Logs.belongsTo(Users);

// RefreshTokens association
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
