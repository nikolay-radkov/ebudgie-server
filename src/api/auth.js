import { getUserByCredentials } from '../lib/postgres';

const create = async (req, res) => {
  const body = req.body;

  if (!body.link_code) {
    return res.status(400).json({ error: 'link_code is required' });
  }

  if (!(body.email || body.phone)) {
    return res.status(400).json({ error: 'email or phone is required' });
  }

  try {
    let user = await getUserByCredentials(body);

    if (!user) {
      return res.status(400).json({ error: 'Bad credentials' });
    }

    return res.json({ status: 'success' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Error during user creation' });
  }
};

export default (app) => {
  app.post('/api/auth', create);
};
