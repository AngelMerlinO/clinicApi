// api/src/services/sales_orders.service.js
import BaseService   from './base.service.js';
import { SalesOrders } from '../models/index.js';

class SalesOrdersService extends BaseService {
  constructor() { super(SalesOrders); }

  async create(data, opts)    {
    // Ejemplo: podrías recalcular total_price aquí
    return super.create(data, opts);
  }
  async findAll(opts)         { return super.findAll(opts);      }
  async findById(id, opts)    { return super.findById(id, opts); }
  async update(id, d, opts)   { return super.update(id, d, opts);}
  async destroy(id, opts)     { return super.destroy(id, opts);  }
}

export default new SalesOrdersService();
