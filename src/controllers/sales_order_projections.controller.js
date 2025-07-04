// api/src/controllers/sales_order_projections.controller.js
import crudController            from './crud.controller.js';
import SalesOrderProjectionsService from '../services/sales_order_projections.service.js';

export default crudController(SalesOrderProjectionsService);
