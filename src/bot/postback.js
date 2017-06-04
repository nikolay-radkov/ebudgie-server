import { isAuthorized, showLoginMenu } from './helpers/auth';
import { showSalary } from './helpers/salary';
import { showExpensesMenu, showIncomesMenu, showThresholdsMenu } from './helpers/menu';
import {
  showMonthlyIncomesAmount,
  showAllIncomesAmount,
  showMonthlyIncomes
} from './helpers/incomes';

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

            break;
          case 'SHOW_ALL_EXPENSES_AMOUNT':

            break;
          case 'SHOW_MONTHLY_EXPENSES':

            break;
          case 'SHOW_ALL_EXPENSES':

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
