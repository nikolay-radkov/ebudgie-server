import { get } from 'lodash';

import {
  calculateCurrentEvents,
  calculateEvents,
  getMonthlyEvents,
  getAllEvents
} from '../../lib/events';
import { getEbudgie } from './ebudgie';

export const showMonthlyExpensesAmount = async (page_scoped_id, reply) => {
  try {
    const ebudgie = await getEbudgie(page_scoped_id, reply);

    if (!ebudgie) {
      return;
    }

    const expenses = get(ebudgie, 'expenses', []);
    const currency = get(ebudgie, 'currency', '$');
    const amount = calculateCurrentEvents(expenses);

    await reply({
      text: `Your current monthly expenses are: ${amount.toFixed(2)}${currency}`
    });
  } catch (e) {
    console.log('Error during showing monthly expenses amount', e);
    await reply({
      text: 'Something went wrong. Please try again.'
    });
  }
};

export const showAllExpensesAmount = async (page_scoped_id, reply) => {
  try {
    const ebudgie = await getEbudgie(page_scoped_id, reply);

    if (!ebudgie) {
      return;
    }

    const expenses = get(ebudgie, 'expenses', []);
    const currency = get(ebudgie, 'currency', '$');
    const amount = calculateEvents(expenses);

    await reply({
      text: `Your all time expenses are: ${amount.toFixed(2)}${currency}`
    });
  } catch (e) {
    console.log('Error during showing all expenses amount', e);
    await reply({
      text: 'Something went wrong. Please try again.'
    });
  }
};

export const showMonthlyExpenses = async (page_scoped_id, reply) => {
  try {
    const ebudgie = await getEbudgie(page_scoped_id, reply);

    if (!ebudgie) {
      return;
    }

    const expenses = get(ebudgie, 'expenses', []);
    const categories = get(ebudgie, 'categories', []);
    const items = get(ebudgie, 'items', []);
    const currency = get(ebudgie, 'currency', '$');
    const monthlyExpenses = getMonthlyEvents(expenses, categories, items) || [];

    if (monthlyExpenses.length > 0) {
      await reply({
        text: 'Your monthly expenses are:'
      });

      for (let i = 0; i < monthlyExpenses.length; i++) {
        let current = monthlyExpenses[i];
        let category = get(current, 'category.title', 'Unkown');
        let item = get(current, 'item.name', 'Unkown');
        await reply({
          text: `Category: ${category}\nItem: ${item}\nValue: ${current.value.toFixed(2)}${currency}`
        });
      }
    }
    else {
      await reply({
        text: 'Your don\'t have any expenses for this month.'
      });
    }
  } catch (e) {
    console.log('Error during showing monthly expenses', e);
    await reply({
      text: 'Something went wrong. Please try again.'
    });
  }
};


export const showAllExpenses = async (page_scoped_id, reply) => {
  try {
    const ebudgie = await getEbudgie(page_scoped_id, reply);

    if (!ebudgie) {
      return;
    }

    const expenses = get(ebudgie, 'expenses', []);
    const categories = get(ebudgie, 'categories', []);
    const items = get(ebudgie, 'items', []);
    const currency = get(ebudgie, 'currency', '$');
    const allExpenses = getAllEvents(expenses, categories, items) || [];

    if (allExpenses.length > 0) {
      await reply({
        text: 'Your all time expenses are:'
      });

      for (let i = 0; i < allExpenses.length; i++) {
        let current = allExpenses[i];
        let category = get(current, 'category.title', 'Unkown');
        let item = get(current, 'item.name', 'Unkown');
        await reply({
          text: `Category: ${category}\nItem: ${item}\nValue: ${current.value.toFixed(2)}${currency}`
        });
      }
    }
    else {
      await reply({
        text: 'Your don\'t have any expenses.'
      });
    }
  } catch (e) {
    console.log('Error during showing all expenses', e);
    await reply({
      text: 'Something went wrong. Please try again.'
    });
  }
};
