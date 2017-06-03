import { isAuthorized, showLoginMenu } from './helpers/auth';
import { showSalary } from './helpers/salary';
import { showMenu } from './helpers/menu';

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

            break;
          case 'income':
          case 'incomes':

            break;
          case 'threshold':
          case 'thresholds':

            break;
          case 'salary':
          case 'salaries':
            await showSalary(page_scoped_id, reply);
            break;
          case 'logout':
          case 'log out':
          case 'sign out':
          case 'signout':

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
