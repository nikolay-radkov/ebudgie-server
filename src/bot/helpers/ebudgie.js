import { getUserByPageScopedId } from '../../lib/postgres';
import { getDocument } from '../../lib/couchdb';

export const getEbudgie = async (page_scoped_id, reply) => {
  const user = await getUserByPageScopedId(page_scoped_id);

  if (!user) {
    await reply({
      text: 'Something went wrong. Please try again.'
    });
    return;
  }

  try {
    const ebudgie = await getDocument(user.ebudgie_id);
    return ebudgie;
  } catch (e) {
    console.log('Error during getting ebudgie', e);
    await reply({
      text: 'Something went wrong. Please try again.'
    });
  }
};
