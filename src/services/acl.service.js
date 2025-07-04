// api/src/services/acl.service.js
import { Permissions, RolePermissions, UserPermissions } from '../models/index.js';

class ACLService {
  /**
   * Returns a Set of permission codes (e.g. 'users:create') for a given user.
   * @param {number} userId
   * @param {number} roleId
   * @returns {Promise<Set<string>>}
   */
  static async getPermissionsForUser(userId, roleId) {
    // Fetch role-based permissions
    const rolePerms = await RolePermissions.findAll({
      where: { role_id: roleId },
      include: [
        {
          model: Permissions,
          as: 'permission',
          attributes: ['code']
        }
      ]
    });

    // Fetch user-specific overrides
    const userPerms = await UserPermissions.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Permissions,
          as: 'permission',
          attributes: ['code']
        }
      ]
    });

    // Consolidate codes into a Set
    const codes = [
      ...rolePerms.map(rp => rp.permission.code),
      ...userPerms.map(up => up.permission.code)
    ];

    return new Set(codes);
  }
}

export default ACLService;
