import { isAuthorized, showLoginMenu } from './helpers/auth';
import { showSalary } from './helpers/salary';
import { showExpensesMenu, showIncomesMenu, showThresholdsMenu } from './helpers/menu';
import {
  showMonthlyExpensesAmount,
  showAllExpensesAmount,
  showMonthlyExpenses,
  showAllExpenses
} from './helpers/expenses';
import {
  showMonthlyIncomesAmount,
  showAllIncomesAmount,
  showMonthlyIncomes,
  showAllIncomes
} from './helpers/incomes';
import {
  showCategoriesThreshold,
  showGlobalThreshold
} from './helpers/threshold';

export default (bot) => {
  return async (data, reply) => {
    const page_scoped_id = data.sender.id;
    const payload = data.postback.payload;

    try {
      const isLogged = await isAuthorized(page_scoped_id);

      if (!isLogged) {
        await showLoginMenu(reply);
      }
      else {
        switch (payload) {
          case 'SHOW_EXPENSES_MENU':
            await showExpensesMenu(reply);
            break;
          case 'SHOW_INCOMES_MENU':
            await showIncomesMenu(reply);
            break;
          case 'SHOW_THRESHOLD_MENU':
            await showThresholdsMenu(reply);
            break;
          case 'SHOW_SALARY':
            await showSalary(page_scoped_id, reply);
            break;
          case 'SHOW_MONTHLY_EXPENSES_AMOUNT':
            await showMonthlyExpensesAmount(page_scoped_id, reply);
            break;
          case 'SHOW_ALL_EXPENSES_AMOUNT':
            await showAllExpensesAmount(page_scoped_id, reply);
            break;
          case 'SHOW_MONTHLY_EXPENSES':
            await showMonthlyExpenses(page_scoped_id, reply);
            break;
          case 'SHOW_ALL_EXPENSES':
            await showAllExpenses(page_scoped_id, reply);
            break;
          case 'SHOW_MONTHLY_INCOMES_AMOUNT':
            await showMonthlyIncomesAmount(page_scoped_id, reply);
            break;
          case 'SHOW_ALL_INCOMES_AMOUNT':
            await showAllIncomesAmount(page_scoped_id, reply);
            break;
          case 'SHOW_MONTHLY_INCOMES':
            await showMonthlyIncomes(page_scoped_id, reply);
            break;
          case 'SHOW_ALL_INCOMES':
            await showAllIncomes(page_scoped_id, reply);
            break;
          case 'SHOW_GLOBAL_THRESHOLD':
            await showGlobalThreshold(page_scoped_id, reply);
            break;
          case 'SHOW_CATEGORIES_THRESHOLD':
            await showCategoriesThreshold(page_scoped_id, reply);
            break;
        }
      }

      const profile = await bot.getProfile(data.sender.id);
      console.log(`Postback to ${profile.first_name} ${profile.last_name}: ${payload}`);
    } catch (e) {
      console.log('ERROR in bot.on(\'postback\')', e);
    }
  };
};
