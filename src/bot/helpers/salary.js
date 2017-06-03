import { getUserByPageScopedId } from '../../lib/postgres';
import { getDocument } from '../../lib/couchdb';

export const showSalary = async (page_scoped_id, reply) => {
  const user = await getUserByPageScopedId(page_scoped_id);

  if (!user) {
    return await reply({
      text: 'Something went wrong. Please try again.'
    });
  }

  try {
    const ebudgie = await getDocument(user.ebudgie_id);
    const salary = ebudgie.salaries[ebudgie.salaries.length - 1];
    await reply({
      text: `Your current salary is: ${salary}`
    });
  } catch (e) {
    console.log('Error during showing salary', e);
    await reply({
      text: 'Something went wrong. Please try again.'
    });
  }
};
