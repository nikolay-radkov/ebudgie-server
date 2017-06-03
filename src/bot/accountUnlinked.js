import { unlinkUser } from '../lib/postgres';

export default (bot) => {
  return async (payload, reply) => {
    const page_scoped_id = payload.sender.id;

    await unlinkUser(page_scoped_id);
    await reply({ text: 'You have successfully logged out from EBudgie' });
    console.log(`Unlinked account -> ${page_scoped_id}`);
  };
};
