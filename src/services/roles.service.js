// api/src/services/roles.service.js
import BaseService from './base.service.js';
import { Roles }   from '../models/index.js';

class RolesService extends BaseService {
  constructor() { super(Roles); }

  // CRUD explícito  – puedes añadir validaciones extra si lo deseas
  async create(data, opts)    { return super.create(data, opts); }
  async findAll(opts)         { return super.findAll(opts);      }
  async findById(id, opts)    { return super.findById(id, opts); }
  async update(id, d, opts)   { return super.update(id, d, opts);}
  async destroy(id, opts)     { return super.destroy(id, opts);  }
}

export default new RolesService();
