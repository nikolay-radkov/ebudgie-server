import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import bot from './bot';
import apiRoutes from './api';
import viewsRoutes from './views';

let app = express();
app.set('port', process.env.PORT || 8080);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/public', express.static(path.join(__dirname, 'static', 'images')));

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
