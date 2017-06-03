export default (bot) => {
  return async (payload, reply) => {
    let text = payload.message.text;

    try {
      const profile = await bot.getProfile(payload.sender.id);
      await reply({ text });
      console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`);
    } catch (e) {
      console.log('ERROR in bot.on(\'message\')', e);
    }
  };
};
