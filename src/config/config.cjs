require('dotenv').config();

const base = {
  username : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME,
  host     : process.env.DB_HOST,
  port     : process.env.DB_PORT,
  dialect  : process.env.DB_DIALECT || 'mysql',
  define   : { underscored: true }
};

module.exports = {
  development: base,
  test:        { ...base, database: `${base.database}_test` },
  production:  base
};
