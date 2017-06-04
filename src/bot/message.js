import { isAuthorized, showLoginMenu, showLogoutMenu } from './helpers/auth';
import { showSalary } from './helpers/salary';
import {
  showMenu,
  showExpensesMenu,
  showIncomesMenu,
  showThresholdsMenu
} from './helpers/menu';
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
    let text = data.message.text || '';

    try {
      const isLogged = await isAuthorized(page_scoped_id);

      if (!isLogged) {
        await showLoginMenu(reply);
      }
      else {
        switch (text.toLowerCase()) {
          case 'menu':
          case 'menus':
            await showMenu(reply);
            break;
          case 'expense':
          case 'expenses':
            await showExpensesMenu(reply);
            break;
          case 'income':
          case 'incomes':
            await showIncomesMenu(reply);
            break;
          case 'threshold':
          case 'limit':
          case 'thresholds':
          case 'limits':
            await showThresholdsMenu(reply);
            break;
          case 'salary':
          case 'salaries':
            await showSalary(page_scoped_id, reply);
            break;
          case 'logout':
          case 'log out':
          case 'sign out':
          case 'signout':
            await showLogoutMenu(reply);
            break;
          case 'monthly expenses amount':
          case 'currently expenses amount':
          case 'currently expenses count':
          case 'monthly expenses count':
            await showMonthlyExpensesAmount(page_scoped_id, reply);
            break;
          case 'all expenses amount':
          case 'expenses amount':
          case 'all expenses count':
          case 'expenses count':
            await showAllExpensesAmount(page_scoped_id, reply);
            break;
          case 'monthly expenses':
          case 'currently expenses':
            await showMonthlyExpenses(page_scoped_id, reply);
            break;
          case 'all expenses':
            await showAllExpenses(page_scoped_id, reply);
            break;
          case 'monthly incomes amount':
          case 'currently incomes amount':
          case 'currently incomes count':
          case 'monthly incomes count':
            await showMonthlyIncomesAmount(page_scoped_id, reply);
            break;
          case 'all incomes amount':
          case 'incomes amount':
          case 'all incomes count':
          case 'incomes count':
            await showAllIncomesAmount(page_scoped_id, reply);
            break;
          case 'monthly incomes':
          case 'currently incomes':
            await showMonthlyIncomes(page_scoped_id, reply);
            break;
          case 'all incomes':
            await showAllIncomes(page_scoped_id, reply);
            break;
          case 'global threshold':
          case 'global limit':
          case 'global thresholds':
          case 'global limits':
            await showGlobalThreshold(page_scoped_id, reply);
            break;
          case 'category threshold':
          case 'category limit':
          case 'category thresholds':
          case 'category limits':
          case 'categories threshold':
          case 'categories limit':
          case 'categories thresholds':
          case 'categories limits':
            await showCategoriesThreshold(page_scoped_id, reply);
            break;
          case 'help':

            break;
          default:
            reply({
              text: 'Sorry I could not understand that. Please try with different words.'
            });
        }
      }
    } catch (e) {
      console.log('ERROR in bot.on(\'message\')', e);
    }
  };
};
