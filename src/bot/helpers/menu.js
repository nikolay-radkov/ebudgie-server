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
            image_url: `${process.env.API_URL}/public/incomes.png`,
            subtitle: 'See how much money you\'ve spent until now',
            buttons: [{
              type: 'postback',
              title: 'Open',
              payload: 'SHOW_EXPENSES_MENU',
            }]
          }, {
            title: 'Incomes menu',
            image_url: `${process.env.API_URL}/public/expenses.png`,
            subtitle: 'See the positive income for your budget',
            buttons: [{
              type: 'postback',
              title: 'Open',
              payload: 'SHOW_INCOMES_MENU',
            }]
          }, {
            title: 'Threshold menu',
            image_url: `${process.env.API_URL}/public/threshold.png`,
            subtitle: 'See what is going on with your prediction',
            buttons: [{
              type: 'postback',
              title: 'Open',
              payload: 'SHOW_THRESHOLD_MENU',
            }]
          }, {
            title: 'Salary',
            image_url: `${process.env.API_URL}/public/salary.png`,
            subtitle: 'See you current salary',
            buttons: [{
              type: 'postback',
              title: 'Show',
              payload: 'SHOW_SALARY'
            }]
          }, {
            title: 'Account logout',
            image_url: `${process.env.API_URL}/public/logout.png`,
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

export const showExpensesMenu = async (reply) => {
  try {
    await reply({
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          image_aspect_ratio: 'square',
          elements: [{
            title: 'Monthly expenses amount',
            image_url: `${process.env.API_URL}/public/login.png`,
            subtitle: 'See total expenses for the current month',
            buttons: [{
              type: 'postback',
              title: 'Show',
              payload: 'SHOW_MONTHLY_EXPENSES_AMOUNT',
            }]
          }, {
            title: 'All expenses amount',
            image_url: `${process.env.API_URL}/public/login.png`,
            subtitle: 'See total expenses for all time',
            buttons: [{
              type: 'postback',
              title: 'Show',
              payload: 'SHOW_ALL_EXPENSES_AMOUNT',
            }]
          }, {
            title: 'Monthly expenses',
            image_url: `${process.env.API_URL}/public/login.png`,
            subtitle: 'See each expense for the month',
            buttons: [{
              type: 'postback',
              title: 'Show',
              payload: 'SHOW_MONTHLY_EXPENSES',
            }]
          }, {
            title: 'All expenses',
            image_url: `${process.env.API_URL}/public/login.png`,
            subtitle: 'See each expense for all time',
            buttons: [{
              type: 'postback',
              title: 'Show',
              payload: 'SHOW_ALL_EXPENSES',
            }]
          }]
        }
      }
    });
  } catch (e) {
    console.log('Error during showing expenses menu', e);
    await reply({
      text: 'Something went wrong. Please try again.'
    });
  }
};

export const showIncomesMenu = async (reply) => {
  try {
    await reply({
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          image_aspect_ratio: 'square',
          elements: [{
            title: 'Monthly incomes amount',
            image_url: `${process.env.API_URL}/public/login.png`,
            subtitle: 'See total incomes for the current month',
            buttons: [{
              type: 'postback',
              title: 'Show',
              payload: 'SHOW_MONTHLY_INCOMES_AMOUNT',
            }]
          }, {
            title: 'All incomes amount',
            image_url: `${process.env.API_URL}/public/login.png`,
            subtitle: 'See total incomes for all time',
            buttons: [{
              type: 'postback',
              title: 'Show',
              payload: 'SHOW_ALL_INCOMES_AMOUNT',
            }]
          }, {
            title: 'Monthly incomes',
            image_url: `${process.env.API_URL}/public/login.png`,
            subtitle: 'See each incomes for the month',
            buttons: [{
              type: 'postback',
              title: 'Show',
              payload: 'SHOW_MONTHLY_INCOMES',
            }]
          }, {
            title: 'All incomes',
            image_url: `${process.env.API_URL}/public/login.png`,
            subtitle: 'See each incomes for all time',
            buttons: [{
              type: 'postback',
              title: 'Show',
              payload: 'SHOW_ALL_INCOMES',
            }]
          }]
        }
      }
    });
  } catch (e) {
    console.log('Error during showing incomes menu', e);
    await reply({
      text: 'Something went wrong. Please try again.'
    });
  }
};

export const showThresholdsMenu = async (reply) => {
  try {
    await reply({
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          image_aspect_ratio: 'square',
          elements: [{
            title: 'Global threshold',
            image_url: `${process.env.API_URL}/public/login.png`,
            subtitle: 'See total threshold results',
            buttons: [{
              type: 'postback',
              title: 'Show',
              payload: 'SHOW_GLOBAL_THRESHOLD',
            }]
          }, {
            title: 'Categories threshold',
            image_url: `${process.env.API_URL}/public/login.png`,
            subtitle: 'See total incomes for all time',
            buttons: [{
              type: 'postback',
              title: 'Show',
              payload: 'SHOW_CATEGORIES_THRESHOLD',
            }]
          }]
        }
      }
    });
  } catch (e) {
    console.log('Error during showing threshold menu', e);
    await reply({
      text: 'Something went wrong. Please try again.'
    });
  }
};


