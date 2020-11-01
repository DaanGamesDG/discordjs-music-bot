const BaseCommand = require('../../utils/structures/BaseCommand');
const emojiFinder = require('../../utils/functions/emoji');

module.exports = class VolumeCommand extends BaseCommand {
  constructor() {
    super('volume', 'Music', ['vol'], 'Changes the volume of the music player', 'volume <number between 1 and 100>');
  }

  run(client, message, args) {
    const queue = client.queue.get(message.guild.id);
    const volume = parseInt(args[0]) / 100;
    const djrole = client.djrole.get(message.guild.id);
    if (!message.member.hasPermission('MANAGE_CHANNELS') && (djrole && !message.member.roles.cache.has(djrole))) return message.channel.send(`> ${emojiFinder(client, 'redtick').toString()} You dont have the right permissions to do that!`);
    if (volume > 1) return message.channel.send(`> ${client.emojis.cache.find(m => m.name === 'redtick').toString()} please choose a between 1 and 100`);
    if (!queue) return message.channel.send(`> ${client.emojis.cache.find(m => m.name === 'redtick').toString()} No server queue found!`);
    if (!volume) return message.channel.send(`> ${client.emojis.cache.find(m => m.name === 'redtick').toString()} No volume specified!`);
    if (!message.member.voice || message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`> ${emojiFinder(client, 'redtick')} You aren't in the same Voice channel as I am!`);
    queue.volume = args[0];
    queue.connection.dispatcher ? queue.connection.dispatcher.setVolume(volume) : '';
    message.channel.send(`> 🔉 Successfully changed volume to \`${volume}\`!`);
  }
}