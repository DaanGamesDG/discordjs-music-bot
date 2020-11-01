const BaseCommand = require('../../utils/structures/BaseCommand');
const inviteLink = 'https://stereomusicbot.statuspage.io/';

module.exports = class StatuspageCommand extends BaseCommand {
  constructor() {
    super('statuspage', 'Utilities', ['spage', 'sp'], 'Gives you the link to the statuspage');
  }

  run(client, message, args) {
    return message.channel.send(`> 💻 My website link is: ${inviteLink}`)
  }
}