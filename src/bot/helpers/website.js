export const showWebsite = async (reply) => {
  try {
    await reply({
      attachment: {
        type: 'template',
        payload: {
          template_type: 'button',
          text: 'Ebudgies\'s website',
          buttons: [{
            type: 'web_url',
            url: 'https://leon92xx.wixsite.com/ebudgie-website/',
            title: 'Open'
          }]
        }
      }
    });

  } catch (e) {
    console.log('Error during showing website button', e);
    await reply({
      text: 'Something went wrong. Please try again.'
    });
  }
};
