const BaseCommand = require('../../utils/structures/BaseCommand');
const dev = require('../../utils/models/dev');

module.exports = class StatusCommand extends BaseCommand {
  constructor() {
    super('statusinfo', 'Developer', ['si']);
  }

  run(client, message, args) {
    if (!client.owners.includes(message.author.id)) return message.delete();
    message.channel.send('status changed!');
    if (!args[0]) {
      client.statusInfo = '> ✅ Bot working as expected!';
      return dev.findOneAndUpdate({ secret: process.env.DISCORD_BOT_SECRET }, { status: '> ✅ Bot working as expected!' }, err => { 
        if (err) console.log(err);
      });
    };
    client.statusInfo = args.map(arg => arg).join(' ');
    dev.findOneAndUpdate({ secret: process.env.DISCORD_BOT_SECRET }, { status: args.map(arg => arg).join(' ') }, err => { 
      if (err) console.log(err);
    });
  }
}