const BaseCommand = require('../../utils/structures/BaseCommand');
const emojiFinder = require('../../utils/functions/emoji');

module.exports = class ClearqueueCommand extends BaseCommand {
  constructor() {
    super('clearqueue', 'Music', ['cq'], 'clears the music queue for the server, it will still play the song that is currently playing!');
  }

  run(client, message, args) {
    const queue = client.queue.get(message.guild.id);
    const djrole = client.djrole.get(message.guild.id);
    let index = 0;
    message.guild.me.voice.channel.members.forEach(member => { if (member.roles.cache.has(djrole)) index++ });
    if (djrole && message.guild.me.voice.channel && index > 0) {
      if (!message.member.hasPermission('MANAGE_CHANNELS') && !message.member.roles.cache.has(djrole)) return message.channel.send(`> ${emojiFinder(client, 'redtick').toString()} You dont have the right permissions to do that!`);
    }
    if (!queue) return message.channels.send(`> ${client.emojis.cache.find(m => m.name === 'redtick').toString()} This server doesn't have a queue`);
    let firstSong = queue.songs.shift();
    let newQueue = [];
    newQueue.push(firstSong);
    queue.songs = newQueue;
    return message.channel.send(`> 🗑 Successfully cleared the queue!`);
  }
}