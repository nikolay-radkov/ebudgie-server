import express from 'express';
import bodyParser from 'body-parser';

import Bot from './lib/Bot';
import initilizeMessangerProfile from './services/messengerProfile';

import { getDocument } from './lib/couchdb';
getDocument('3cfc9a96341c0e24')
  .then(d => console.log(d))
  .catch(d => console.log(d))

let bot = new Bot({
  token: process.env.PAGE_TOKEN,
  verify: process.env.VERIFY_TOKEN,
  app_secret: process.env.APP_SECRET
});

initilizeMessangerProfile(bot);

bot.on('error', (err) => {
  console.log(err.message);
});

bot.on('message', async (payload, reply) => {
  let text = payload.message.text;

  try {
    const profile = await bot.getProfile(payload.sender.id);
    await reply({ text });
    console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`);
  } catch (e) {
    console.log('ERROR in bot.on(\'message\')', e);
  }
});

bot.on('postback', async (payload, reply) => {
  let text = payload.postback.payload;

  try {
    const profile = await bot.getProfile(payload.sender.id);
    await reply({
      attachment: {
        type: 'template',
        payload: {
          template_type: 'button',
          text: 'What do you want to do next?',
          buttons: [{
            type: 'account_link',
            url: 'https://leon92xx.wixsite.com/ebudgie-website/'
          }]
        }
      }
    });
    console.log(`Postback to ${profile.first_name} ${profile.last_name}: ${text}`);
  } catch (e) {
    console.log('ERROR in bot.on(\'postback\')', e);
  }
});

let app = express();
app.set('port', process.env.PORT || 8080);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  return bot._verify(req, res);
});

app.post('/', (req, res) => {
  bot._handleMessage(req.body);
  res.end(JSON.stringify({ status: 'ok' }));
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
