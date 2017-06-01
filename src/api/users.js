import { getUser, insertUser } from '../lib/postgres';

const create = async (req, res) => {
  const body = req.body;

  if (!body.ebudgie_id) {
    return res.status(400).json({ error: 'ebudgie_id is required' });
  }

  if (!(body.email || body.phone)) {
    return res.status(400).json({ error: 'email or phone is required' });
  }

  try {
    let user = await getUser(body.ebudgie_id);

    if (!user) {
      user = await insertUser(body);
      user = user[0];
    }

    return res.json({ link_code: user.link_code });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Error during user creation' });
  }
};

export default (app) => {
  app.post('/api/users', create);
};
