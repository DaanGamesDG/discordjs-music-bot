const BaseCommand = require('../../utils/structures/BaseCommand');
const emojiFinder = require('../../utils/functions/emoji');

module.exports = class ResumeCommand extends BaseCommand {
  constructor() {
    super('resume', 'Music', ['r', 'res'], 'Resumes the playback when the playback is paused');
  }

  run(client, message, args) {
    const queue = client.queue.get(message.guild.id);
    if (!queue || queue.playing) return message.channel.send(`> ${client.emojis.cache.find(m => m.name === 'redtick').toString()} This server doesnt have a queue or the player is already playing!`);
    if (!message.member.voice || message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`> ${emojiFinder(client, 'redtick')} You aren't in the same Voice channel as I am!`);
    queue.connection.dispatcher.resume();
    queue.playing = true;
    return message.channel.send(`> ▶ Successfully resumed the player!`);
  }
}