// api/src/controllers/cost_centers.controller.js
import crudController    from './crud.controller.js';
import CostCentersService from '../services/cost_centers.service.js';

export default crudController(CostCentersService);

