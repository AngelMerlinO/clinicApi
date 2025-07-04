// api/src/services/base.service.js
export default class BaseService {
  constructor(model) {
    this.model = model;
  }

  async create(data, options = {}) {
    return this.model.create(data, options);
  }

  async findAll(options = {}) {
    return this.model.findAll(options);
  }

  async findById(id, options = {}) {
    return this.model.findByPk(id, options);
  }

  async update(id, data, options = {}) {
    const record = await this.model.findByPk(id);
    if (!record) throw new Error(`${this.model.name} not found`);
    return record.update(data, options);
  }

  async destroy(id, options = {}) {
    const record = await this.model.findByPk(id);
    if (!record) throw new Error(`${this.model.name} not found`);
    return record.destroy(options);
  }
}
