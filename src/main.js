import express from 'express';
import bodyParser from 'body-parser';

import Bot from './lib/Bot';
import initializeMessangerProfile from './services/messengerProfile';
import apiRoutes from './api';
import viewsRoutes from './views';
import { updateUser } from './lib/postgres';

// import { getDocument } from './lib/couchdb';
// getDocument('3cfc9a96341c0e24')
//   .then(d => console.log(d))
//   .catch(d => console.log(d))

let bot = new Bot({
  token: process.env.PAGE_TOKEN,
  verify: process.env.VERIFY_TOKEN,
  app_secret: process.env.APP_SECRET
});

initializeMessangerProfile(bot);

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
          text: 'EBudgie needs to log you',
          buttons: [{
            type: 'account_link',
            url: process.env.LOGIN_URL
          }]
        }
      }
    });
    console.log(`Postback to ${profile.first_name} ${profile.last_name}: ${text}`);
  } catch (e) {
    console.log('ERROR in bot.on(\'postback\')', e);
  }
});

bot.on('accountLinked', async (payload, reply) => {
  const page_scoped_id = payload.sender.id;
  const link_code = payload.account_linking.authorization_code;

  await updateUser(link_code, page_scoped_id);

  await reply({ text: 'Please choose an option now' });
  console.log(`Linked account ${link_code} -> ${page_scoped_id}`);
});

let app = express();
app.set('port', process.env.PORT || 8080);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

viewsRoutes(app);
apiRoutes(app);

app.get('/', (req, res) => {
  return bot._verify(req, res);
});

app.post('/', (req, res) => {
  bot._handleMessage(req.body);
  res.json({ status: 'ok' });
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
