import {
  ValidationError,
  UniqueConstraintError,
  ForeignKeyConstraintError
} from 'sequelize';

/**
 * Maneja errores de forma profesional.
 */
function handleError(res, err, action = 'processing request') {
  console.error(`❌ Error while ${action}:`, err.message);

  // Loguea detalles útiles
  if (err.original?.message) console.error('🔍 SQL:', err.original.message);

  // Manejo de errores conocidos
  if (err instanceof ValidationError) {
    return res.status(400).json({
      error: 'Validation error',
      message: err.errors.map(e => e.message).join(', ')
    });
  }

  if (err instanceof UniqueConstraintError) {
    return res.status(409).json({
      error: 'Duplicate value',
      message: err.errors.map(e => `${e.path} must be unique`).join(', ')
    });
  }

  if (err instanceof ForeignKeyConstraintError) {
    return res.status(400).json({
      error: 'Foreign key error',
      message: err.message
    });
  }

  // Error inesperado
  return res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
}

/**
 * Genera un conjunto de handlers CRUD a partir de un servicio.
 */
export default (service) => ({
  /* POST / */
  create: async (req, res) => {
    try {
      console.log('📥 Crear registro con:', req.body);
      const item = await service.create(req.body);
      res.status(201).json(item);
    } catch (err) {
      handleError(res, err, 'creating resource');
    }
  },

  /* GET / */
  getAll: async (req, res) => {
    try {
      const items = await service.findAll();
      res.json(items);
    } catch (err) {
      handleError(res, err, 'fetching all resources');
    }
  },

  /* GET /:id */
  getOne: async (req, res) => {
    try {
      const item = await service.findById(req.params.id);
      if (!item) return res.status(404).json({ error: 'Resource not found' });
      res.json(item);
    } catch (err) {
      handleError(res, err, 'fetching single resource');
    }
  },

  /* PUT /:id */
  update: async (req, res) => {
    try {
      const item = await service.update(req.params.id, req.body);
      res.json(item);
    } catch (err) {
      handleError(res, err, 'updating resource');
    }
  },

  /* DELETE /:id */
  remove: async (req, res) => {
    try {
      await service.destroy(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      handleError(res, err, 'deleting resource');
    }
  }
});
