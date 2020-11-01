const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SkipCommand extends BaseCommand {
  constructor() {
    super('skip', 'Music', [], 'Skips the current playing song in the guild using votes.');
  }

  run(client, message, args) {
    const queue = client.queue.get(message.guild.id);
    const vote = client.vote.get(message.guild.id);
    const voteCount = queue.connection.channel.members.size - 2;
    if (vote.users.includes(message.author.id)) return message.channel.send(`> ${client.emojis.cache.find(m => m.name === 'redtick').toString()} You already voted! (${vote.votes})`);
    if (!queue || !queue.songs[0]) return message.channel.send(`> ${client.emojis.cache.find(m => m.name === 'redtick').toString()} This server doesnt have a queue!`);
    if (vote.votes + 1 >= voteCount) {
      queue.connection.dispatcher.end();
      vote.votes = 0;
      vote.users = [];
      return message.channel.send(`> ⏭ Successfully skipped the current song!`);
    }
    if (voteCount <= 0) {
      queue.connection.dispatcher.end();
      return message.channel.send(`> ⏭ Successfully skipped the current song!`);
    } else {
      vote.votes = vote.votes + 1;
      vote.users.push(message.author.id);
      return message.channel.send(`> 👍 **Skip the current song?**(${vote.votes}/${voteCount})`);
    }
  }
}