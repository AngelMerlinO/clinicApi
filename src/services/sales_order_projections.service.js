// api/src/services/sales_order_projections.service.js
import BaseService          from './base.service.js';
import { SalesOrderProj }   from '../models/index.js';

class SalesOrderProjectionsService extends BaseService {
  constructor() { super(SalesOrderProj); }

  async create(data, opts)    { return super.create(data, opts); }
  async findAll(opts)         { return super.findAll(opts);      }
  async findById(id, opts)    { return super.findById(id, opts); }
  async update(id, d, opts)   { return super.update(id, d, opts);}
  async destroy(id, opts)     { return super.destroy(id, opts);  }
}

export default new SalesOrderProjectionsService();
