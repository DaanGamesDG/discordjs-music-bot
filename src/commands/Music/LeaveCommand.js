const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class LeaveCommand extends BaseCommand {
  constructor() {
    super('leave', 'Music', ['disconnect'], 'Leaves the voice channel when the bot is in one');
  }

  async run(client, message, args) {
    if (!message.guild.me.voice.channel) return message.channel.send(`> ${client.emojis.cache.find(m => m.name === 'redtick').toString()} I'm not in a voice channel!`);
    if (!message.member.voice.channel || message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`> ${client.emojis.cache.find(m => m.name === 'redtick').toString()} You aren't in the correct voice channel!`);
    client.queue.delete(message.guild.id);
    client.vote.delete(message.guild.id);
    message.member.voice.channel.fetch().then(async channel => {
      await channel.leave();
      return message.channel.send(`> 🔇 Successfully disconnected!`);
    })
  }
}