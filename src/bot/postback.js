// import { getDocument } from './lib/couchdb';
// getDocument('3cfc9a96341c0e24')
//   .then(d => console.log(d))
//   .catch(d => console.log(d))

export default (bot) => {
  return async (payload, reply) => {
    let text = payload.postback.payload;

    try {
      const profile = await bot.getProfile(payload.sender.id);
      await reply({
        attachment: {
          type: 'template',
          payload: {
            template_type: 'generic',
            elements: [{
              title: 'EBudgie needs to log you',
              image_url: 'https://petersfancybrownhats.com/company_image.png',
              subtitle: 'To see what is going on with your account you need to login first.',
              buttons: [{
                type: 'account_link',
                url: process.env.LOGIN_URL
              }]
            }]
          }
        }
      });
      console.log(`Postback to ${profile.first_name} ${profile.last_name}: ${text}`);
    } catch (e) {
      console.log('ERROR in bot.on(\'postback\')', e);
    }
  };
};
