// api/src/services/role_permissions.service.js
import BaseService         from './base.service.js';
import { RolePermissions } from '../models/index.js';

class RolePermissionsService extends BaseService {
  constructor() { super(RolePermissions); }

  async create(data, opts)  { return super.create(data, opts); }
  async findAll(opts)       { return super.findAll(opts);      }
  async findById(id, opts)  { return super.findById(id, opts); }
  async update(id, d, opts) { return super.update(id, d, opts);}
  async destroy(id, opts)   { return super.destroy(id, opts);  }
}

export default new RolePermissionsService();
