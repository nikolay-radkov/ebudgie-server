import { get } from 'lodash';

import { getEbudgie } from './ebudgie';

export const showSalary = async (page_scoped_id, reply) => {
  try {
    const ebudgie = await getEbudgie(page_scoped_id, reply);

    if (!ebudgie) {
      return;
    }

    const salary = get(ebudgie.salaries[ebudgie.salaries.length - 1], 'value', 0);
    const currency = get(ebudgie, 'currency', '$');
    await reply({
      text: `Your current salary is: ${salary}${currency}`
    });
  } catch (e) {
    console.log('Error during showing salary', e);
    await reply({
      text: 'Something went wrong. Please try again.'
    });
  }
};
