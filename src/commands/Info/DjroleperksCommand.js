const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class DjroleperksCommand extends BaseCommand {
  constructor() {
    super('djroleperks', 'Info', ['djrp', 'djperks', 'djperks'], 'Shows the perks for the dj role');
  }

  run(client, message, args) {
    const embed = new MessageEmbed()
      .setTitle(`🎧 DJ Role Perks`)
      .setDescription([
        `**⏭ Force Skip:** Users with the DJ Role can force skip the command without needing the \`MANAGE_CHANNELS\` permission. \n`,
        `**⏭ Skip to:** Users with the DJ Role can force skip the command without needing the \`MANAGE_CHANNELS\` permission. \n`,
        `**🔊 Volume:** When the server has a DJ role only the users with that role will be able to change it. \n`,
        `**🗑 Clearqueue:** When the server has a DJ role and one of the users with that role joines the VC they will be the only one that can clear it. Otherwise everyone can. \n`,
        `**⏏ Remove:** When the server has a DJ role and one of the users with that role joines the VC they will be the only one that can remove a song, the requester can also do that without the role. Otherwise everyone can. \n`,
        `**🔀 Shuffle:** When the server has a DJ role and one of the users with that role joines the VC they will be the only one that can shuffle the queue. Otherwise everyone can. \n`,
        `**🔁 Repeat:** When the server has a DJ role and one of the users with that role joines the VC they will be the only one that can reoeat the queue. Otherwise everyone can.`
      ])
      .setColor(message.member.displayHexColor || 'BLUE')
    message.channel.send(embed);
  }
}