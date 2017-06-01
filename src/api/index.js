import auth from './auth';
import users from './users';

export default (app) => {
  auth(app);
  users(app);
};
