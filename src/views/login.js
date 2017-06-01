import path from 'path';

const login = (req, res) => {
  res.sendFile(path.resolve(__dirname, '../static', 'login.html'));
};

export default (app) => {
  app.get('/login', login);
};
