// api/src/services/projections.service.js
import BaseService   from './base.service.js';
import { Projections } from '../models/index.js';

class ProjectionsService extends BaseService {
  constructor() { super(Projections); }

  async create(data, opts)    { return super.create(data, opts); }
  async findAll(opts)         { return super.findAll(opts);      }
  async findById(id, opts)    { return super.findById(id, opts); }
  async update(id, d, opts)   { return super.update(id, d, opts);}
  async destroy(id, opts)     { return super.destroy(id, opts);  }
}

export default new ProjectionsService();
