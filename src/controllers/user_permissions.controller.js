// api/src/controllers/user_permissions.controller.js
import crudController         from './crud.controller.js';
import UserPermissionsService from '../services/user_permissions.service.js';

export default crudController(UserPermissionsService);
