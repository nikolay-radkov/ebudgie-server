import { get } from 'lodash';

import { calculateCurrentEvents } from '../../lib/events';
import { getEbudgie } from './ebudgie';

export const showMontlyIncomesAmount = async (page_scoped_id, reply) => {
  try {
    const ebudgie = await getEbudgie(page_scoped_id, reply);

    if (!ebudgie) {
      return;
    }

    const incomes = get(ebudgie, 'incomes', []);
    const currency = get(ebudgie, 'currency', '$');
    const amount = calculateCurrentEvents(incomes);

    await reply({
      text: `Your current salary is: ${amount}${currency}`
    });
  } catch (e) {
    console.log('Error during showing salary', e);
    await reply({
      text: 'Something went wrong. Please try again.'
    });
  }
};
