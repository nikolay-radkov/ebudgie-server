export const showWelcome = async (bot, page_sender_id, reply) => {
  try {
    const profile = await bot.getProfile(page_sender_id);

    await reply({
      text: `Hello, ${profile.first_name}`
    });
    await reply({
      text: 'I hope you are having a great day. How can I help you?'
    });
  } catch (e) {
    console.log('Error during showing welcome message', e);
    await reply({
      text: 'Something went wrong. Please try again.'
    });
  }
};
