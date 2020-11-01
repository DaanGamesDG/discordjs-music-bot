const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const StatusPage = require('statuspage');
const status = new StatusPage(process.env.STATUSPAGE_TOKEN, process.env.PAGE_ID); 

module.exports = class StatusCommand extends BaseCommand {
  constructor() {
    super('status', 'Info', [], 'Shows you the status information about the bot, it also shows you if the bot is in maintance/dev only mode!');
  }

  async run(client, message, args) {
    let s = await status.getComponents();
    const embed = new MessageEmbed()
    .setTitle(`Stereo's Status Information`)
    .setDescription([
      `${client.devmode ? `> <:discord_dev_badge:746539385842958357> Dev mode is **enabled**, this means that only Developers+ of ${client.user.toString()} can use the commands` : '> <:discord_dev_badge:746539385842958357> Dev mode is disabled, commands are available for everyone!'} \n`,
      `${(client.statusInfo === '> ✅ Bot working as expected!') ? '> ✅ Bot working as expected!' : '> ❗'+ client.statusInfo} \n`,
      `**${s[0].name}:** ${s[0].status}`,
      `**${s[1].name}:** ${s[1].status}`
    ])
    .setColor(client.statusInfo !== '> ✅ Bot working as expected!' ? `#e35807` : '#77b255')
    return message.channel.send(embed);
  }
}
