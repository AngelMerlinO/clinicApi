// api/src/services/cost_centers.service.js
import BaseService   from './base.service.js';
import { CostCenters } from '../models/index.js';

class CostCentersService extends BaseService {
  constructor() { super(CostCenters); }

  async create(data, opts)    { return super.create(data, opts); }
  async findAll(opts)         { return super.findAll(opts);      }
  async findById(id, opts)    { return super.findById(id, opts); }
  async update(id, d, opts)   { return super.update(id, d, opts);}
  async destroy(id, opts)     { return super.destroy(id, opts);  }
}

export default new CostCentersService();
