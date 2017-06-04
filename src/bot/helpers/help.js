export const showHelp = async (reply) => {
  try {
    await reply({
      text: 'You can communicate with me with 2 ways:\n1. Open the menu and choose an action from Account\n2. Text me a message and I will try to answer you'
    });
    await reply({
      text: 'Some of the things that you can text me are the following:'
    });
    await reply({
      text: `menu - open the menu with different options
expenses - open a menu for expenses 
incomes - open a menu for incomes 
threshold - open a menu for threshold`
    });
    await reply({
      text: `
salary - show your current salary
monthly expenses amount - show the amount of your expenses for the current month
all expenses amount - show the amount of all of your expenses
monthly expenses - show detailed expenses for the current month
all expenses - show detailed expenses for all time
monthly incomes amount - show the amount of your incomes for the current month
all incomes amount - show the amount of all of your incomes
monthly incomes - show detailed incomes for the current month
all incomes - show detailed incomes for all time
`
    });
    await reply({
      text: `global threshold - show an info for your global threshold
categories threshold - show an info for your categories threshold
`
    });

    await reply({
      text: 'logout - show a menu for signin out of EBudgie\'s account'
    });

  } catch (e) {
    console.log('Error during showing help', e);
    await reply({
      text: 'Something went wrong. Please try again.'
    });
  }
};
