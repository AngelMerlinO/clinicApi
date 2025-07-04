// api/src/controllers/logs.controller.js
import crudController from './crud.controller.js';
import LogsService    from '../services/logs.service.js';

export default crudController(LogsService);
