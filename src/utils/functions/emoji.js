/**
 * 
 * @param {object} client discord client object
 * @param {string} emojiname name of the emoji
 */
function emojiFinder(client, emojiname) {
  let guild = client.guilds.cache.get('746536046275198997');
  let emoji = guild.emojis.cache.find(m => m.name.toLowerCase() == emojiname.toLowerCase());
  if (!emoji) throw new TypeError('Invalid emoji name!');
  return emoji;
}

module.exports = emojiFinder;