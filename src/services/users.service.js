// api/src/services/users.service.js
import BaseService from './base.service.js';
import { Users }   from '../models/index.js';
import bcrypt      from 'bcryptjs';                   // ← nuevo

const SALT_ROUNDS = 10;                               // puedes ajustar

class UsersService extends BaseService {
  constructor() { super(Users); }

  /* CREATE with password hashing */
  async create(data, opts) {
    // solo hashea si viene passwordHash (o password plano, tú decides)
    if (data.passwordHash) {
      data.passwordHash = await bcrypt.hash(data.passwordHash, SALT_ROUNDS);
    }
    return super.create(data, opts);
  }

  async findAll(opts)      { return super.findAll(opts);      }
  async findById(id, opts) { return super.findById(id, opts); }
  async update(id, d, opts){
    if (d.passwordHash) {
      d.passwordHash = await bcrypt.hash(d.passwordHash, SALT_ROUNDS);
    }
    return super.update(id, d, opts);
  }
  async destroy(id, opts)  { return super.destroy(id, opts);  }

  async findByEmail(email, opts={}) {
    return this.model.findOne({ where: { email }, ...opts });
  }
}

export default new UsersService();
