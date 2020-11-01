const BaseCommand = require('../../utils/structures/BaseCommand');
const lryicsfinder = require('lyrics-finder');
const { MessageEmbed } = require('discord.js');

module.exports = class LyricsCommand extends BaseCommand {
  constructor() {
    super('lyrics', 'Music', ['lyr', 'l'], 'Gives the lyrics the song playing in the guild');
  }

  async run(client, message, args) {
    const queue = client.queue.get(message.guild.id);
    if (!queue || !queue.songs[0]) return message.channel.send(`> ${client.emojis.cache.find(m => m.name === 'redtick').toString()} This server doesnt have a queue!`);
    let songTitle = queue.songs[0].title
    .toLowerCase()
    .replace('(official video)', '')
    .replace('lyrics', '')
    .replace('(video)', '')

    await lryicsfinder(songTitle, '').then(lyrics => {
      if (!lyrics) return message.channel.send(`> 📑 No lyrics for **${queue.songs[0].title}** found!`);
      const embed = new MessageEmbed()
        .setAuthor(`Lyrics for ${queue.songs[0].title}`, queue.playing ? 'https://emoji.gg/assets/emoji/6935_Plak_Emoji.gif' : 'https://imgur.com/Y9XRC6N.png')
        .setDescription(lyrics)
        .setColor(message.member.displayHexColor || 'BLUE')

      if (embed.description.length >= 2048)
        embed.description = `${embed.description.substr(0, 2045)}...`;
      return message.channel.send(embed).catch(console.error);
    })
  }
}
