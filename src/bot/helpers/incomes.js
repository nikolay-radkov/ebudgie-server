import { get } from 'lodash';

import {
  calculateCurrentEvents,
  calculateEvents,
  getMonthlyEvents,
  getAllEvents
} from '../../lib/events';
import { getEbudgie } from './ebudgie';

export const showMonthlyIncomesAmount = async (page_scoped_id, reply) => {
  try {
    const ebudgie = await getEbudgie(page_scoped_id, reply);

    if (!ebudgie) {
      return;
    }

    const incomes = get(ebudgie, 'incomes', []);
    const currency = get(ebudgie, 'currency', '$');
    const amount = calculateCurrentEvents(incomes);

    await reply({
      text: `Your current monthly incomes are: ${amount.toFixed(2)}${currency}`
    });
  } catch (e) {
    console.log('Error during showing monthly incomes amount', e);
    await reply({
      text: 'Something went wrong. Please try again.'
    });
  }
};

export const showAllIncomesAmount = async (page_scoped_id, reply) => {
  try {
    const ebudgie = await getEbudgie(page_scoped_id, reply);

    if (!ebudgie) {
      return;
    }

    const incomes = get(ebudgie, 'incomes', []);
    const currency = get(ebudgie, 'currency', '$');
    const amount = calculateEvents(incomes);

    await reply({
      text: `Your all time incomes are: ${amount.toFixed(2)}${currency}`
    });
  } catch (e) {
    console.log('Error during showing all incomes amount', e);
    await reply({
      text: 'Something went wrong. Please try again.'
    });
  }
};

export const showMonthlyIncomes = async (page_scoped_id, reply) => {
  try {
    const ebudgie = await getEbudgie(page_scoped_id, reply);

    if (!ebudgie) {
      return;
    }

    const incomes = get(ebudgie, 'incomes', []);
    const categories = get(ebudgie, 'categories', []);
    const items = get(ebudgie, 'items', []);
    const currency = get(ebudgie, 'currency', '$');
    const monthlyIncomes = getMonthlyEvents(incomes, categories, items) || [];

    if (monthlyIncomes.length > 0) {
      await reply({
        text: 'Your monthly incomes are:'
      });

      for (let i = 0; i < monthlyIncomes.length; i++) {
        let current = monthlyIncomes[i];
        let category = get(current, 'category.title', 'Unkown');
        let item = get(current, 'item.name', 'Unkown');
        await reply({
          text: `Category: ${category}\nItem: ${item}\nValue: ${current.value.toFixed(2)}${currency}`
        });
      }
    }
    else {
      await reply({
        text: 'Your don\'t have any incomes for this month.'
      });
    }
  } catch (e) {
    console.log('Error during showing monthly incomes', e);
    await reply({
      text: 'Something went wrong. Please try again.'
    });
  }
};


export const showAllIncomes = async (page_scoped_id, reply) => {
  try {
    const ebudgie = await getEbudgie(page_scoped_id, reply);

    if (!ebudgie) {
      return;
    }

    const incomes = get(ebudgie, 'incomes', []);
    const categories = get(ebudgie, 'categories', []);
    const items = get(ebudgie, 'items', []);
    const currency = get(ebudgie, 'currency', '$');
    const allIncomes = getAllEvents(incomes, categories, items) || [];

    if (allIncomes.length > 0) {
      await reply({
        text: 'Your all time incomes are:'
      });

      for (let i = 0; i < allIncomes.length; i++) {
        let current = allIncomes[i];
        let category = get(current, 'category.title', 'Unkown');
        let item = get(current, 'item.name', 'Unkown');
        await reply({
          text: `Category: ${category}\nItem: ${item}\nValue: ${current.value.toFixed(2)}${currency}`
        });
      }
    }
    else {
      await reply({
        text: 'Your don\'t have any incomes.'
      });
    }
  } catch (e) {
    console.log('Error during showing all incomes', e);
    await reply({
      text: 'Something went wrong. Please try again.'
    });
  }
};
