const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class RestartCommand extends BaseCommand {
  constructor() {
    super('tap', 'Developer', ['terminateallprocesses']);
  }

  async run(client, message, args) {
    if (!client.owners.includes(message.author.id)) return message.channel.send(`> 🎵 I'm looking for my owner, can you help me searching?`);
    if (!args[0]) return message.channel.send(`> No reason`);
    await message.channel.send('> 🔄 terminating all processes...');
    await client.guilds.cache.forEach(async guild =>  {
      let queue = client.queue.get(guild.id);
      if (!queue && !guild.me.voice.channel) return;
      if (!queue && guild.me.voice.channel) return guild.me.voice.channel.leave();
      queue.textChannel.send(`> 🔈 T.A.P Activated, stopping the music. Reason: ${args.map(a => a).join(' ')}`); 
      await queue.channel.fetch().then(ch => ch.leave());
    });
    client.queue = new Map();
  }
}