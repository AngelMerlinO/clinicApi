// api/src/controllers/role_permissions.controller.js
import crudController        from './crud.controller.js';
import RolePermissionsService from '../services/role_permissions.service.js';

export default crudController(RolePermissionsService);
