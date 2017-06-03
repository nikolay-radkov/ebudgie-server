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
        elements: [{
          title: 'EBudgie needs to log you',
          image_url: `${process.env.API_URL}/public/login.png`,
          image_aspect_ratio: 'square',
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
