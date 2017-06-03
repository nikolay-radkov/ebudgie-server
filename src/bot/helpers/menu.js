export const showMenu = async (reply) => {
  try {
    await reply({
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          image_aspect_ratio: 'square',
          elements: [{
            title: 'Expenses menu',
            image_url: `${process.env.API_URL}/public/login.png`,
            subtitle: 'See how much money you\'ve spent until now',
            buttons: [{
              type: 'postback',
              title: 'Open',
              payload: 'SHOW_EXPENSES_MENU',
            }]
          }, {
            title: 'Incomes menu',
            image_url: `${process.env.API_URL}/public/login.png`,
            subtitle: 'See the positive income for your budget',
            buttons: [{
              type: 'postback',
              title: 'Open',
              payload: 'SHOW_INCOMES_MENU',
            }]
          }, {
            title: 'Threshold menu',
            image_url: `${process.env.API_URL}/public/login.png`,
            subtitle: 'See what is going on with your prediction',
            buttons: [{
              type: 'postback',
              title: 'Open',
              payload: 'SHOW_THRESHOLD_MENU',
            }]
          }, {
            title: 'Salary',
            image_url: `${process.env.API_URL}/public/login.png`,
            subtitle: 'See you current salary',
            buttons: [{
              type: 'postback',
              title: 'Show',
              payload: 'SHOW_SALARY'
            }]
          }, {
            title: 'Account logout',
            image_url: `${process.env.API_URL}/public/login.png`,
            subtitle: 'Logout from EBudgie\'s account',
            buttons: [{
              type: 'account_unlink'
            }]
          }]
        }
      }
    });
  } catch (e) {
    console.log('Error during showing menu', e);
    await reply({
      text: 'Something went wrong. Please try again.'
    });
  }
};
