const BaseCommand = require('../../utils/structures/BaseCommand');
const inviteLink = 'http://bit.ly/stereoinvite';

module.exports = class InviteCommand extends BaseCommand {
  constructor() {
    super('invite', 'Utilities', [], 'Gives you the invite link of the bot');
  }

  run(client, message, args) {
    return message.channel.send(`> ✉ My invite link is: ${inviteLink}`)
  }
}