import { get, sumBy, sortBy } from 'lodash';

import getSlogan from '../../lib/slogan';

import {
  calculateCurrentEvents,
  getThresholdCategories
} from '../../lib/events';
import { getEbudgie } from './ebudgie';

export const showGlobalThreshold = async (page_scoped_id, reply) => {
  try {
    const ebudgie = await getEbudgie(page_scoped_id, reply);

    if (!ebudgie) {
      return;
    }

    const threshold = get(ebudgie.thresholds[ebudgie.thresholds.length - 1], 'value', 0);
    const expenses = get(ebudgie, 'expenses', []);
    const currency = get(ebudgie, 'currency', '$');
    const amount = calculateCurrentEvents(expenses);

    const globalThresholdPercentage = (Math.abs(amount) / threshold) * 100;
    const slogan = getSlogan(globalThresholdPercentage);

    await reply({
      text: slogan
    });

    await reply({
      text: `Your current total threshold is at ${globalThresholdPercentage}%`
    });
    await reply({
      text: `Limit: ${threshold}${currency}`
    });
    await reply({
      text: `Expenses: ${expenses}${currency}`
    });
  } catch (e) {
    console.log('Error during showing global threshold', e);
    await reply({
      text: 'Something went wrong. Please try again.'
    });
  }
};

export const showCategoriesThreshold = async (page_scoped_id, reply) => {
  try {
    const ebudgie = await getEbudgie(page_scoped_id, reply);

    if (!ebudgie) {
      return;
    }

    const categories = get(ebudgie.thresholds[ebudgie.thresholds.length - 1], 'categories', []);
    const expenses = get(ebudgie, 'expenses', []);
    const incomes = get(ebudgie, 'incomes', []);
    const currency = get(ebudgie, 'currency', '$');

    if (categories.length === 0) {
      await reply({
        text: 'There are currently no categories in you threshold'
      });
      return;
    }

    const thresholdCategories = getThresholdCategories(ebudgie.categories, categories, expenses, incomes);
    await reply({
      text: 'Your limits for categories are:'
    });

    for (let i = 0; i < thresholdCategories.length; i++) {
      let category = thresholdCategories.title;
      let categoryExpense = sumBy(category.expenses, 'value');
      let categoryThresholdPercentage = (Math.abs(categoryExpense) / category.value) * 100;

      await reply({
        text: `${category} threshold is at ${categoryThresholdPercentage}%\nLimit: ${category.value}${currency}\nExpenses: ${categoryExpense}${currency}`
      });
    }
  } catch (e) {
    console.log('Error during showing categories threshold', e);
    await reply({
      text: 'Something went wrong. Please try again.'
    });
  }
};
