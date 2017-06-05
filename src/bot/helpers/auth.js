import { getUserByPageScopedId } from '../../lib/postgres';

export const isAuthorized = async (page_scoped_id) => {
  const user = await getUserByPageScopedId(page_scoped_id);

  return !!user;
};

export const showLoginMenu = async (reply) => {
  await reply({
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        image_aspect_ratio: 'square',
        elements: [{
          title: 'EBudgie needs to log you',
          image_url: `${process.env.API_URL}/public/login.png`,
          subtitle: 'To see what is going on with your account you need to login first.',
          buttons: [{
            type: 'account_link',
            url: `${process.env.API_URL}/login`
          }]
        }]
      }
    }
  });
};

export const showLogoutMenu = async (reply) => {
  await reply({
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        image_aspect_ratio: 'square',
        elements: [{
          title: 'Account logout',
          image_url: `${process.env.API_URL}/public/logout.png`,
          subtitle: 'Logout from EBudgie\'s account',
          buttons: [{
            type: 'account_unlink'
          }]
        }]
      }
    }
  });
};
