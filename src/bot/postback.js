import { isAuthorized, showLoginMenu } from './helpers/auth';
import { showSalary } from './helpers/salary';

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

            break;
          case 'SHOW_INCOMES_MENU':

            break;
          case 'SHOW_THRESHOLD_MENU':

            break;
          case 'SHOW_SALARY':
            await showSalary(page_scoped_id, reply);
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
