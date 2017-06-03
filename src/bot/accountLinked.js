import { updateUser } from '../lib/postgres';

export default (bot) => {
  return async (payload, reply) => {
    const page_scoped_id = payload.sender.id;
    const link_code = payload.account_linking.authorization_code;

    await updateUser(link_code, page_scoped_id);

    await reply({ text: 'Please choose an option now' });
    console.log(`Linked account ${link_code} -> ${page_scoped_id}`);
  };
};
