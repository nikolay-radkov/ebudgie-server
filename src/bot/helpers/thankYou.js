export const showThankYou = async (bot, page_sender_id, reply) => {
  try {
    const profile = await bot.getProfile(page_sender_id);

    await reply({
      text: `Thank you too, ${profile.first_name}`
    });
    await reply({
      text: 'It was a pleasure to chat with you!'
    });
    await reply({
      text: ':)'
    });
  } catch (e) {
    console.log('Error during showing welcome message', e);
    await reply({
      text: 'Something went wrong. Please try again.'
    });
  }
};
