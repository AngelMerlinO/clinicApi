// api/src/controllers/projections.controller.js
import crudController  from './crud.controller.js';
import ProjectionsService from '../services/projections.service.js';

export default crudController(ProjectionsService);
