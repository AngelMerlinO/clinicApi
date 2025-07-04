// api/src/controllers/sales_orders.controller.js
import crudController   from './crud.controller.js';
import SalesOrdersService from '../services/sales_orders.service.js';

export default crudController(SalesOrdersService);
