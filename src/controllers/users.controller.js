// api/src/controllers/users.controller.js
import crudController from './crud.controller.js';
import UsersService   from '../services/users.service.js';

export default {
  ...crudController(UsersService),

  // ejemplo de endpoint extra: GET /email/:email
  async getByEmail(req, res, next) {
    try {
      const user = await UsersService.findByEmail(req.params.email);
      if (!user) return res.sendStatus(404);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
};
