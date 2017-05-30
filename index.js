'use strict'
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const Bot = require('./Bot')

let bot = new Bot({
  token: process.env.PAGE_TOKEN,
  verify: process.env.VERIFY_TOKEN,
  app_secret: process.env.APP_SECRET
})

bot.setGreetingText('Welcome to EBudgie\'s assistant', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Setting GreetingText result ${JSON.stringify(data)}`);
});
bot.setPersistentMenu([
  {
    "title": "Account",
    "type": "nested",
    "call_to_actions": [
      {
        "title": "Expenses",
        "type": "postback",
        "payload": "SHOW_EXPENSES"
      },
      {
        "title": "Incomes",
        "type": "postback",
        "payload": "SHOW_INCOMES"
      },
      {
        "title": "Threshold",
        "type": "postback",
        "payload": "SHOW_THRESHOLD"
      }
    ]
  },
  {
    "type": "web_url",
    "title": "Visit Website",
    "url": "https://leon92xx.wixsite.com/ebudgie-website/",
    "webview_height_ratio": "full"
  }
], (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Setting setPersistentMenu result ${JSON.stringify(data)}`);
});

bot.setGetStartedButton([{
  payload: 'New user connected'
}], (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Setting GetStartedButton result ${JSON.stringify(data)}`);
});

// bot.setPersistentMenu(payload, callback)

bot.on('error', (err) => {
  console.log(err.message)
})

bot.on('message', (payload, reply) => {
  let text = payload.message.text

  bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err

    reply({ text }, (err) => {
      if (err) throw err

      console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`)
    })
  })
})

bot.on('postback', (payload, reply) => {
  let text = payload.message.text

  bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err

    reply({
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "button",
          "text": "What do you want to do next?",
          "buttons": [
            {
              "type": "account_link",
              "url": "https://leon92xx.wixsite.com/ebudgie-website/"
            }
          ]
        }
      }
    }, (err) => {
      if (err) throw err

      console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`)
    })
  })
})

let app = express()
app.set('port', process.env.PORT || 8080);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', (req, res) => {
  return bot._verify(req, res)
})

app.post('/', (req, res) => {
  bot._handleMessage(req.body)
  res.end(JSON.stringify({ status: 'ok' }))
})

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
