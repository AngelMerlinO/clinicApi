// api/src/routes/generator.js
import { Router } from 'express';
import crudController     from '../controllers/crud.controller.js';
import { authorize }      from '../middleware/authorize.js';

/**
 * Crea un router CRUD protegido por permisos.
 * @param {string} path      URL base (ej. '/users')
 * @param {BaseService} service  Servicio Sequelize
 * @param {string=} resource  nombre lógico del recurso; por defecto se infiere del path
 */
export default function generateCrud(path, service, resource = path.replace(/^\//, '').replace(/-/g, '_')) {
  const r = Router();
  const c = crudController(service);

  r.post('/',        authorize(resource, 'create'), c.create);
  r.get('/',         authorize(resource, 'read'),   c.getAll);
  r.get('/:id',      authorize(resource, 'read'),   c.getOne);
  r.put('/:id',      authorize(resource, 'update'), c.update);
  r.delete('/:id',   authorize(resource, 'delete'), c.remove);

  return { path, router: r };
}
