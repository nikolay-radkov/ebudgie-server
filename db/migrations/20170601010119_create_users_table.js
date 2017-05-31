exports.up = function up(knex) {
  return knex.raw(`
    CREATE SEQUENCE IF NOT EXISTS link_id_seq;
    CREATE TABLE IF NOT EXISTS users (
      id bigserial PRIMARY KEY NOT NULL,
      ebudgie_id TEXT NOT NULL UNIQUE,
      email TEXT,
      phone TEXT,
      link_code TEXT UNIQUE DEFAULT 'EBudgie-' || CAST(nextval('link_id_seq'::regclass) AS text),
      page_scoped_id BIGINT UNIQUE,
      created_at TIMESTAMP NOT NULL DEFAULT current_timestamp
    );
`);
};

exports.down = function down(knex) {
  return knex.raw(`
    DROP TABLE IF EXISTS users CASCADE;
    DROP SEQUENCE IF EXISTS link_id_seq;
  `);
};
