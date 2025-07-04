// api/src/server.js
import 'dotenv/config';
import app from './app.js';
import { sequelize } from './models/index.js';

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('🗄️  DB connection OK');

    app.listen(PORT, () => console.log(`🚀 API running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('❌ Unable to connect to DB:', err.message);
    process.exit(1);
  }
})();
