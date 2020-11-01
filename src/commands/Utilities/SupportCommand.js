const BaseCommand = require('../../utils/structures/BaseCommand');
const inviteLink = 'https://discord.gg/bvn89qP';

module.exports = class SupportCommand extends BaseCommand {
  constructor() {
    super('support', 'Utilities', ['discord'], 'gives you the support server invite link');
  }

  run(client, message, args) {
    return message.channel.send(`> ✉ My Support server link is: ${inviteLink}`)
  }
}