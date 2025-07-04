// api/src/controllers/roles.controller.js
import crudController from './crud.controller.js';
import RolesService   from '../services/roles.service.js';

export default crudController(RolesService);
