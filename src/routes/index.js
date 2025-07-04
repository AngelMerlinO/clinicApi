// api/src/routes/index.js
import { Router } from 'express';
import generate      from './generator.js';
import { verifyToken } from '../middleware/auth.js';

import AuthRoutes          from './auth.routes.js';
import UsersService        from '../services/users.service.js';
import RolesService        from '../services/roles.service.js';
import PermissionsService  from '../services/permissions.service.js';
import CostCentersService  from '../services/cost_centers.service.js';
import SalesOrdersService  from '../services/sales_orders.service.js';
import ProjectionsService  from '../services/projections.service.js';

const api = Router();

/* 1️⃣  Login sin token */
api.use('/auth', AuthRoutes);

/* 2️⃣  A partir de aquí TODO requiere JWT */
api.use(verifyToken);

/* 3️⃣  Rutas CRUD protegidas */
[
  generate('/users',        UsersService),
  generate('/roles',        RolesService),
  generate('/permissions',  PermissionsService),
  generate('/cost-centers', CostCentersService),
  generate('/sales-orders', SalesOrdersService),
  generate('/projections',  ProjectionsService)
].forEach(({ path, router }) => api.use(path, router));

export default api;
