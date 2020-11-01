const BaseCommand = require('../../utils/structures/BaseCommand');
const emojiFinder = require('../../utils/functions/emoji');

module.exports = class SkipCommand extends BaseCommand {
  constructor() {
    super('forceskip', 'Music', ['fs'], 'Skips the current playing song in the guild.');
  }

  run(client, message, args) {
    const queue = client.queue.get(message.guild.id);
    const djrole = client.djrole.get(message.guild.id);
    if (!message.member.hasPermission('MANAGE_CHANNELS') && (djrole && !message.member.roles.cache.has(djrole))) return message.channel.send(`> ${emojiFinder(client, 'redtick').toString()} You dont have the right permissions to do that!`);
    if (!queue || !queue.songs[0]) return message.channel.send(`> ${emojiFinder(client, 'redtick').toString()} This server doesnt have a queue!`);
    if (!message.member.voice || message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`> ${emojiFinder(client, 'redtick')} You aren't in the same Voice channel as I am!`);
    queue.connection.dispatcher.end();
    return message.channel.send(`> ⏭ Successfully skipped the current song!`);
  }
}