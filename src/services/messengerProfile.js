export const setGreetingText = async (bot) => {
  try {
    const data = await bot.setGreetingText('Welcome to EBudgie\'s assistant');
    console.log(`Setting GreetingText result ${JSON.stringify(data)}`);
  } catch (e) {
    console.log('Error during setGreetingText', e);
  }
};

export const setPersistentMenu = async (bot) => {
  try {
    const data = await bot.setPersistentMenu([{
      title: 'Account',
      type: 'nested',
      call_to_actions: [{
        title: 'Expenses',
        type: 'postback',
        payload: 'SHOW_EXPENSES'
      },
      {
        title: 'Incomes',
        type: 'postback',
        payload: 'SHOW_INCOMES'
      },
      {
        title: 'Threshold',
        type: 'postback',
        payload: 'SHOW_THRESHOLD'
      }]
    }, {
      type: 'web_url',
      title: 'Visit Website',
      url: 'https://leon92xx.wixsite.com/ebudgie-website/',
      webview_height_ratio: 'full'
    }]);
    console.log(`Setting setPersistentMenu result ${JSON.stringify(data)}`);
  } catch (e) {
    console.log('Error during setPersistentMenu', e);
  }
};

export const setGetStartedButton = async (bot) => {
  try {
    const data = await bot.setGetStartedButton([{
      payload: 'New user connected'
    }]);
    console.log(`Setting GetStartedButton result ${JSON.stringify(data)}`);
  } catch (e) {
    console.log('Error during setGetStartedButton', e);
  }
};

export const initialize = async (bot) => {
  await setGreetingText(bot);
  await setGetStartedButton(bot);
  await setPersistentMenu(bot);
};

export default initialize;
