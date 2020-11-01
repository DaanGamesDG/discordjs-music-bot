const BaseCommand = require('../../utils/structures/BaseCommand');
const emojiFinder = require('../../utils/functions/emoji');

module.exports = class SkiptoCommand extends BaseCommand {
  constructor() {
    super('skipto', 'Music', ['st'], 'skips to a certain song in the queue', 'skipto <queue song number>');
  }

  run(client, message, args) {
    const queue = client.queue.get(message.guild.id);
    const djrole = client.djrole.get(message.guild.id);

    message.guild.me.voice.channel.members.forEach(member => { if (member.roles.cache.has(djrole)) index++ });
    if (!message.member.voice.channel || message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`> 🔇 You aren't in a voice channel!`);
    if (djrole && message.guild.me.voice.channel && index > 0 && message.member.voice.channel.members.size - 1 !== 1) {
      if (!message.member.hasPermission('MANAGE_CHANNELS') && !message.member.roles.cache.has(djrole) && queue.songs[0].requester.id !== message.author.id) return message.channel.send(`> ${emojiFinder(client, 'redtick').toString()} You dont have the right permissions to do that!`);
    }
    if (!args[0] || parseInt(args[0]) - 1 > queue.songs.size || parseInt(args[0]) - 1 === 0) return message.channel.send(`> ${client.emojis.cache.find(m => m.name === 'redtick').toString()} Can not find the song in the queue`);
    if (!queue || !queue.songs[0]) return message.channel.send(`> ${client.emojis.cache.find(m => m.name === 'redtick').toString()} This server doesnt have a queue!`);
    queue.songs.splice(0, Math.floor(args[0] - 1));
    queue.connection.dispatcher.end();
    return message.channel.send(`> ⏏️ moved to song ${parseInt(args[0])}!`);
  }
}