// api/src/controllers/permissions.controller.js
import crudController   from './crud.controller.js';
import PermissionsService from '../services/permissions.service.js';

export default crudController(PermissionsService);
