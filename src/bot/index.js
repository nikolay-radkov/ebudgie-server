import Bot from '../lib/Bot';

import message from './message';
import postback from './postback';
import accountLinked from './accountLinked';
import accountUnlinked from './accountUnlinked';

const bot = new Bot({
  token: process.env.PAGE_TOKEN,
  verify: process.env.VERIFY_TOKEN,
  app_secret: process.env.APP_SECRET
});

bot.on('error', (err) => {
  console.log(err.message);
});

bot.on('message', message(bot));
bot.on('postback', postback(bot));
bot.on('accountLinked', accountLinked(bot));
bot.on('accountUnlinked', accountUnlinked(bot));

export default bot;
