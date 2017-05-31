module.exports = {
  client: 'pg',
  connection: process.env.PG_URI + '?ssl=true',
  pool: {
    min: process.env.PG_POOL_MIN,
    max: process.env.PG_POOL_MAX
  },
  migrations: {
    tableName: 'knex_migrations'
  },
  searchPath: 'knex,public'
};
