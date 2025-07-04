// src/middleware/authorize.js
import ACL from '../services/acl.service.js';

export const authorize = (resource, action) => {
  const needed = `${resource}:${action}`;

  return async (req, res, next) => {
    try {
      const { id: userId, roleId } = req.user;          // <- injectado por verifyToken
      const perms = await ACL.getPermissionsForUser(userId, roleId);

      if (perms.has(needed) || perms.has('*:*')) {
        return next();
      }
      return res.status(403).json({ message: 'Forbidden' });
    } catch (err) {
      next(err);
    }
  };
};
