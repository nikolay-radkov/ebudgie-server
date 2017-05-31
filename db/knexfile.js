module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL + '?ssl=true',
  pool: {
    min: process.env.PG_POOL_MIN,
    max: process.env.PG_POOL_MAX
  },
  migrations: {
    tableName: 'knex_migrations'
  },
  searchPath: 'knex,public'
};
