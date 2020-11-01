const BaseCommand = require('../../utils/structures/BaseCommand');
const shuffle = require('../../utils/functions/shuffle');
const emojiFinder = require('../../utils/functions/emoji');

module.exports = class ShuffleCommand extends BaseCommand {
  constructor() {
    super('shuffle', 'Music', [], 'Randomizes the order of the songs');
  }

  async run(client, message, args) {
    const queue = client.queue.get(message.guild.id);
    const djrole = client.djrole.get(message.guild.id);
    let index = 0;
    message.guild.me.voice.channel.members.forEach(member => { if (member.roles.cache.has(djrole)) index++ });
    if (djrole && message.guild.me.voice.channel && index > 0) {
      if (!message.member.hasPermission('MANAGE_CHANNELS') && !message.member.roles.cache.has(djrole)) return message.channel.send(`> ${emojiFinder(client, 'redtick').toString()} You dont have the right permissions to do that!`);
    }
    if (!queue) return message.channels.send(`> ${client.emojis.cache.find(m => m.name === 'redtick').toString()} This server doesn't have a queue`);
    if (queue.songs.length === 1) return message.channel.send(`> ${client.emojis.cache.find(m => m.name === 'redtick').toString()} this server only has 1 song in the queue!`);
    if (!message.member.voice || message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`> ${emojiFinder(client, 'redtick')} You aren't in the same Voice channel as I am!`);
    await shuffle(client, message);
    return message.channel.send(`> 🔀 Queue successfully shuffled!`);
  }
}