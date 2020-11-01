const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class JoinCommand extends BaseCommand {
  constructor() {
    super('join', 'Music', ['connect'], 'let the bot joins the voice channel you are in');
  }

  run(client, message, args) {
    if (message.guild.me.voice.channel) return message.channel.send(`> ${client.emojis.cache.find(m => m.name === 'redtick').toString()} I'm already connected to a voice channel!`);
    if (!message.member.voice.channel) return message.channel.send(`> ${client.emojis.cache.find(m => m.name === 'redtick').toString()} You aren't connected voice channel!`);
    message.member.voice.channel.join().then(connection => connection.voice.setSelfDeaf(true));
    return message.channel.send(`> 🔊 Successfully connected!`);
  }
}