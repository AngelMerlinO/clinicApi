// api/src/routes/auth.routes.js
import { Router } from 'express';
import AuthCtrl   from '../controllers/auth.controller.js';

const r = Router();

/* POST /api/auth/login */
r.post('/login', AuthCtrl.login);
r.post('/refresh',  AuthCtrl.refresh);  

export default r;
