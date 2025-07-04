// api/src/services/logs.service.js
import BaseService from './base.service.js';
import { Logs }    from '../models/index.js';

class LogsService extends BaseService {
  constructor() { super(Logs); }

  async create(data, opts)    { return super.create(data, opts); }
  async findAll(opts)         { return super.findAll(opts);      }
  async findById(id, opts)    { return super.findById(id, opts); }
  async update(id, d, opts)   { return super.update(id, d, opts);}
  async destroy(id, opts)     { return super.destroy(id, opts);  }
}

export default new LogsService();
