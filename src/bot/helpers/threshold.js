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
      text: `Your current total threshold is at ${globalThresholdPercentage.toFixed(2)}%`
    });
    await reply({
      text: `Limit: ${threshold.toFixed(2)}${currency}`
    });
    await reply({
      text: `Expenses: ${amount.toFixed(2)}${currency}`
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
      let category = thresholdCategories[i];
      let categoryExpense = sumBy(category.expenses, 'value');
      let categoryThresholdPercentage = (Math.abs(categoryExpense) / category.value) * 100;

      await reply({
        text: `${category.title} threshold is at ${categoryThresholdPercentage.toFixed(2)}%\nLimit: ${category.value.toFixed(2)}${currency}\nExpenses: ${categoryExpense.toFixed(2)}${currency}`
      });
    }
  } catch (e) {
    console.log('Error during showing categories threshold', e);
    await reply({
      text: 'Something went wrong. Please try again.'
    });
  }
};
