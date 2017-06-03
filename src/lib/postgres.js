import knexFactory from 'knex';

import knexfile from '../../db/knexfile';

const db = knexFactory(knexfile);

export const getUserByEbudgieId = async (ebudgie_id) => {
  return await db('users')
    .select()
    .where({ ebudgie_id })
    .first();
};

export const getUserByCredentials = async ({ link_code, email = null, phone = null }) => {
  return await db('users')
    .select()
    .where({ link_code })
    .andWhere(db.raw('(email = :email OR phone = :phone)', { email, phone }))
    .first();
};

export const getUserByPageScopedId = async (page_scoped_id) => {
  return await db('users')
    .select()
    .where({ page_scoped_id })
    .first();
};

export const insertUser = async (userData) => {
  return await db('users')
    .insert({
      ebudgie_id: userData.ebudgie_id,
      email: userData.email,
      phone: userData.phone
    })
    .returning('*');
};

export const updateUser = async (link_code, page_scoped_id) => {
  return await db('users')
    .where({ link_code })
    .update({ page_scoped_id })
    .returning('*');
};

export const unlinkUser = async (page_scoped_id) => {
  return await db('users')
    .where({ page_scoped_id })
    .update({ page_scoped_id: null })
    .returning('*');
};

export default db;
