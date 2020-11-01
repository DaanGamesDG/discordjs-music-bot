async function roleFinder(message, role) {
  let r = await message.guild.roles.cache.get(role) ? message.guild.roles.cache.get(role) :
  message.guild.roles.cache.find(r => r.name.toLowerCase() === role) ? message.guild.roles.cache.find(r => r.name.toLowerCase() === role) :
  message.mentions.roles.first() ? message.mentions.roles.first() : 'no role found'
  return r;
}

module.exports = roleFinder;