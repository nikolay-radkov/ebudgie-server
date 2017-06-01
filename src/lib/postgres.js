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

export const insertUser = async (userData) => {
  return await db('users')
    .insert({
      ebudgie_id: userData.ebudgie_id,
      email: userData.email,
      phone: userData.phone
    })
    .returning('*');
};

export default db;
