const BaseCommand = require('../../utils/structures/BaseCommand');
const emojiFinder = require('../../utils/functions/emoji');
const repeatType = {
  song: '🔂 Repeating the current song!',
  queue: '🔁 Repeating the current queue!',
  none: '▶ Stopped Repeating!'
}
module.exports = class RepeatCommand extends BaseCommand {
  constructor() {
    super('repeat', 'Music', [], 'repeats the music queue or song or stops the repeat', 'repeat <queue, song, none>');
  }

  run(client, message, args) {
    const queue = client.queue.get(message.guild.id);    
    const djrole = client.djrole.get(message.guild.id);
    let index = 0;
    message.guild.me.voice.channel.members.forEach(member => { if (member.roles.cache.has(djrole)) index++ });
    
    if (!queue.songs[0]) return message.channel.send(`> ${emojiFinder(client, 'redtick').toString()} This server doesnt have a queue!`);
    if (djrole && message.guild.me.voice.channel && index > 0) {
      if (!message.member.hasPermission('MANAGE_CHANNELS') && !message.member.roles.cache.has(djrole)) return message.channel.send(`> ${emojiFinder(client, 'redtick').toString()} You dont have the right permissions to do that!`);
    }
    if (!args[0] || !['queue', 'song', 'none'].includes(args[0].toLowerCase())) return message.channel.send(`> ${emojiFinder(client, 'redtick').toString()} Incorrect usage, \`queue(repeat the queue)\`, \`song(repeat the song)\`, \`none(stops repeating)\`!`);
    if (!message.member.voice || message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`> ${emojiFinder(client, 'redtick')} You aren't in the same Voice channel as I am!`);
    queue.repeat = args[0].toLowerCase();
    return message.channel.send(`> ${repeatType[args[0].toLowerCase()]}`);
  }
}