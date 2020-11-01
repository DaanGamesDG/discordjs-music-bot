const BaseCommand = require('../../utils/structures/BaseCommand');
const emojiFinder = require('../../utils/functions/emoji');

module.exports = class RemoveCommand extends BaseCommand {
  constructor() {
    super('remove', 'Music', [], 'removes a certain song from the queue', 'remove <queue song number>');
  }

  run(client, message, args) {
    const queue = client.queue.get(message.guild.id);
    const djrole = client.djrole.get(message.guild.id);
    let index = 0;
    if (!message.member.voice.channel || message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`> 🔇 You aren't in a voice channel!`);
    message.guild.me.voice.channel.members.forEach(member => { if (member.roles.cache.has(djrole)) index++ });
    if (djrole && message.guild.me.voice.channel && index > 0) {
      if (!message.member.hasPermission('MANAGE_CHANNELS') && !message.member.roles.cache.has(djrole) && queue.songs[0].requester.id !== message.author.id) return message.channel.send(`> ${emojiFinder(client, 'redtick').toString()} You dont have the right permissions to do that!`);
    }
    if (!queue || !queue.songs[0]) return message.channel.send(`> ${client.emojis.cache.find(m => m.name === 'redtick').toString()} This server doesnt have a queue!`);
    if (!args[0] || parseInt(args[0]) - 1 > queue.songs.size || parseInt(args[0]) - 1 === 0) return message.channel.send(`> ${client.emojis.cache.find(m => m.name === 'redtick').toString()} Can not find the song in the queue`);
    if (!message.member.voice || message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`> ${emojiFinder(client, 'redtick')} You aren't in the same Voice channel as I am!`);
    const index2 = queue.songs.indexOf(parseInt(args[0]) - 1);
    queue.songs.splice(index2, 1);
    let songQueue = [];
    /*queue.songs.forEach(song => {
      if (song.title !== queue.songs[parseInt(args[0] - 1)].title) {
        songQueue.push(song);
      };
    })
    queue.songs = songQueue;*/
    return message.channel.send(`> ⏏️ Removed song ${parseInt(args[0])}!`);
  }
}