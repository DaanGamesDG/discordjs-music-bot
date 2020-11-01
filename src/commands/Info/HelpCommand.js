const BaseCommand = require('../../utils/structures/BaseCommand');
const emojiFinder = require(`../../utils/functions/emoji`);
const { MessageEmbed } = require('discord.js');

const inviteLink = 'https://discord.com/oauth2/authorize?client_id=745665203777306664&&scope=bot&permissions=11947336&response_type=code&redirect_uri=https%3A%2F%2Fofficialstereodisc.wixsite.com%2Fhome';
const supportServer = 'https://discord.gg/bvn89qP';
const website = 'https://officialstereodisc.wixsite.com/home';

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'Info', ['h', '<@745665203777306664>', '<@!745665203777306664>'], 'you should know that right?', 'help [command name or alias]');
  }

  run(client, message, args) {
    if (client.user.username === 'Stereo Dev' && client.devmode && !client.owners.includes(message.author.id)) return message.channel.send(`> 🎵 I'm looking for my owner, can you help me searching?`)
    const prefix = client.prefix.get(message.guild.id) || process.env.DISCORD_BOT_PREFIX;
    let embed = new MessageEmbed()
      .setTitle(`${message.guild.name}'s help menu`)
      .setThumbnail(message.guild.iconURL({ dynamic: true, size: 4096 }) || client.user.displayAvatarURL({ dynamic: true, size: 4096 }))
      .setColor(message.member.displayHexColor || 'BLUE')
    
    client.owners.includes(message.author.id) ? embed.addField(`Bot Commands - [${client.cs.size}]`, `\`<>\` means this part of the command is needed | \`[]\` means that this part of the command is optional and not needed`) :
      embed.addField(`Bot Commands - [${client.cs.size - 5}]`, `\`<>\` means this part of the command is needed | \`[]\` means that this part of the command is optional and not needed`)
    
    if (args[0]) {
      const cmd = client.commands.get(args[0]);
      if (!cmd) return message.channel.send(`> ${client.emojis.cache.find(m => m.name === 'redtick').toString()} Could not find the command!`);
      embed.setDescription([
        `**Name:** \`${cmd.name}\``,
        `**Category:** ${cmd.category}`,
        `**Alliases:** ${cmd.aliases.length ? cmd.aliases.map(alias => `\`${alias}\``).join(' ') : 'No aliases'}`,
        `**description:** ${cmd.description || 'No description given'}`,
        `**usage:** ${cmd.usage || 'No usage given'}`,
      ]);
      embed.addField(`Bot Status:`, `${client.devmode ? `> <:discord_dev_badge:746539385842958357> Dev mode is **enabled**, this means that only Developers+ of ${client.user.toString()} can use the commands` : '> <:discord_dev_badge:746539385842958357> Dev mode is disabled, commands are available for everyone!'} \n \n ${(client.statusInfo === '> ✅ Bot working as expected!') ? '> ✅ Bot working as expected!' : '> ❗'+ client.statusInfo}`)
      embed.addField(`\u200b`, `[Invite me](${inviteLink}) | [Support Server](${supportServer}) | [Website](${website})`)
      return message.channel.send(embed);
    } else {
      let categories;
      if (!client.owners.includes(message.author.id)) {
        categories = removeDuplicates(client.cs.filter(cmd => cmd.category !== 'Developer' && cmd.category !== 'Test').map(cmd => cmd.category));
      } else {
        categories = removeDuplicates(client.cs.map(cmd => cmd.category));
      }

      for (const category of categories) {
        embed.addField(`**${category}**`, client.cs.filter(cmd => cmd.category === category).map(cmd => `\`${cmd.name}\``).join(' '), true);
      }
      embed.setDescription(`> 🤖 The prefix for this server is \`${prefix}\`, \n \n > 💬 Use \`${prefix}help <command name>\` to get more info about a specific command!`);
      embed.addField(`Bot Status:`, `${client.devmode ? `> <:discord_dev_badge:746539385842958357> Dev mode is **enabled**, this means that only Developers+ of ${client.user.toString()} can use the commands` : '> <:discord_dev_badge:746539385842958357> Dev mode is disabled, commands are available for everyone!'} \n \n ${(client.statusInfo === '> ✅ Bot working as expected!') ? '> ✅ Bot working as expected!' : '> ❗'+ client.statusInfo}`)
      embed.addField(`\u200b`, `[Invite me](${inviteLink}) | [Support Server](${supportServer}) | [Website](${website})`)
      return message.channel.send(embed)
    }
  }
}

function removeDuplicates(arr) {
  return [...new Set(arr)];
}