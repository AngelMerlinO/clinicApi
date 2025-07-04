import { Router } from 'express';
import crudController from '../controllers/crud.controller.js';

export default function generateCrud(path, service) {
  const r = Router();
  const c = crudController(service);

  r.post('/',    c.create);
  r.get('/',     c.getAll);
  r.get('/:id',  c.getOne);
  r.put('/:id',  c.update);
  r.delete('/:id', c.remove);

  return { path, router: r };
}
