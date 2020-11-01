const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class RestartCommand extends BaseCommand {
  constructor() {
    super('restart', 'Developer', []);
  }

  async run(client, message, args) {
    if (!client.owners.includes(message.author.id)) return message.channel.send(`> 🎵 I'm looking for my owner, can you help me searching?`);
    await message.channel.send('> 🔄 restarting...');
    process.exit();
  }
}