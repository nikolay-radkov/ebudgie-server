import knexFactory from 'knex';

import knexfile from '../../db/knexfile';

const client = knexFactory(knexfile);

export default client;
