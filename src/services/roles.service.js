// api/src/services/roles.service.js
import BaseService from './base.service.js';
import { Roles, Permissions } from '../models/index.js';

class RolesService extends BaseService {
  constructor() {
    super(Roles);
  }

  async create(data, opts = {}) {
    const { permissions, permissionIds, permissionsIds, ...roleData } = data;
    const permIds = permissions || permissionIds || permissionsIds || [];
    const role = await super.create(roleData, opts);
    if (Array.isArray(permIds) && permIds.length) {
      await role.setPermissions(permIds, opts);
    }
    return role.reload({ include: [{ model: Permissions }] });
  }

  async findAll(opts = {}) {
    return this.model.findAll({ include: [{ model: Permissions }], ...opts });
  }

  async findById(id, opts = {}) {
    return this.model.findByPk(id, { include: [{ model: Permissions }], ...opts });
  }

  async update(id, data, opts = {}) {
    const { permissions, permissionIds, permissionsIds, ...roleData } = data;
    const permIds = permissions || permissionIds || permissionsIds || [];
    const role = await super.update(id, roleData, opts);
    if (Array.isArray(permIds)) {
      await role.setPermissions(permIds, opts);
    }
    return role.reload({ include: [{ model: Permissions }] });
  }

  async destroy(id, opts = {}) {
    return super.destroy(id, opts);
  }
}

export default new RolesService();
