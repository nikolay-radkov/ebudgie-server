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
  console.log(`Setting GreetingText result ${JSON.stringify(data)}`);
});

bot.setGetStartedButton([{
  payload: 'New user connected'
}], (err, data) => {
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
