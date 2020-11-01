const BaseCommand = require('../../utils/structures/BaseCommand');
const { version } = require('../../../package.json');
const { MessageEmbed } = require('discord.js');

module.exports = class ChangelogsCommand extends BaseCommand {
  constructor() {
    super('changelogs', 'Info', ['patchnotes'], 'shows the the latest changelogs notes of the bot');
  }

  run(client, message, args) {
    const embed = new MessageEmbed()
      .setTitle(`Patch Notes for version ${version}`)
      .addField(`**❯ Added:**`, [
        `- DJ Role System | Alows servers to add DJ roles to people to give them the ability to do things without needing the right permissions`,
        `- Changelog command | This command shows the things added to the latest update`,
        `- DJ Perks | Shows you the perks that are given to the users with the DJ Role`,
        `- 24/7 | This will loop the songs 24/7 without leaving the channel (only works when server has permium)`
      ])
      .addField(`**❯ Changed:**`, [
        `- Fixed the skip to issue when only one user is in the voice channel`,
        `- When adding a playlist it will now start the first song and it will load the other songs in the background`,
        `- Ping Command showing the wrong ping`
      ])
      .setColor('#77b255')
    message.channel.send(embed);
  }
}