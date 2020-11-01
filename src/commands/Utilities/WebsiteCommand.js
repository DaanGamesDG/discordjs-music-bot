const BaseCommand = require('../../utils/structures/BaseCommand');
const inviteLink = 'https://officialstereodisc.wixsite.com/home';

module.exports = class WebsiteCommand extends BaseCommand {
  constructor() {
    super('website', 'Utilities', [], 'gives you the website link of the discord bot');
  }

  run(client, message, args) {
    return message.channel.send(`> 💻 My website link is: ${inviteLink}`)
  }
}