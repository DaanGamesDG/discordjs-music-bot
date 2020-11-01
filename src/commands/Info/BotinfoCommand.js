const BaseCommand = require('../../utils/structures/BaseCommand');

const { MessageEmbed, version: djsversion } = require('discord.js');
const { version } = require('../../../package.json');
const ms = require('ms');
const moment = require('moment');
const os = require('os');

module.exports = class BotinfoCommand extends BaseCommand {
  constructor() {
    super('botinfo', 'Info', ['binfo', 'bot', 'info'], 'Gives you some info about the bot');
  }

  run(client, message, args) {
    const core = os.cpus()[0];
    const embed = new MessageEmbed()
      .setThumbnail(client.user.displayAvatarURL())
      .setTitle(`${client.user.username}'s bot info`)
      .setColor(message.guild.me.displayHexColor || 'BLUE')
      .addField(`**❯ General**`, [
        `**Client:** ${client.user.toString()}`,
        `**Servers:** ${client.guilds.cache.size.toLocaleString()}`,
        `**Channels:** ${client.channels.cache.size.toLocaleString()}`,
        `**Commands:** ${client.cs.size.toLocaleString()}`,
        `**Users:** ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,
        `**Nodejs:** ${process.version}`,
        `**Discordjs:** v${djsversion}`,
        `**Version:** ${version}`,
        `**Creation date:** ${moment(client.user.createdTimestamp).format(`Do MM YY`)} | ${moment(client.user.createdTimestamp).format(`HH:mm:ss`)}`,
        `\u200b`
      ])
      .addField(`**❯ System**`, [
        `**Platform:** ${os.platform}`,
        `**Uptime** ${ms(os.uptime() * 1000, { long: true })}`,
        `**❯ CPU:**`,
        `\u3000 **Cores:** ${os.cpus().length}`,
        `\u3000 **Model:** ${core.model}`,
        `\u3000 **Speed:** ${core.speed}Mhz`,
        `**❯ Memory:**`,
        `\u3000 **Total:** ${formatBytes(process.memoryUsage().heapTotal)}`,
        `\u3000 **Used:** ${formatBytes(process.memoryUsage().heapUsed)}`,
      ])
      .addField(`**❯ Creators**`, [
        `**Project Leader:** <:rolling:750377995822301265> ${client.users.cache.get('715289819630141487').tag}`,
        `**Bot Developer:** <:daangamesdg:750379156725956688> ${client.users.cache.get('304986851310043136').tag}`,
        `**Website Developer:** <:e_luzmog:750377951895224413> ${client.users.cache.get('624658532381360140').tag}`,
        `**Art Creator:** <:DinoAtlasDragon:750377985554776134> ${client.users.cache.get('552788119334813716').tag}`
      ])
    return message.channel.send(embed)
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
}