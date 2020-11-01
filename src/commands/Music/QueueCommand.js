const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const repeats = {
  queue: `🔁 Repeat: Queue`,
  song: `🔂 Repeat: Song`,
  none: `▶ Repeat: None`
}
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('queue', 'Music', ['q'], 'shows the music queue of the server');
  }

  async run(client, message, args) {
    const queue = client.queue.get(message.guild.id);
    if (!queue || !queue.songs[0]) return message.channel.send(`> ${client.emojis.cache.find(m => m.name === 'redtick').toString()} This server doesnt have a queue!`);
    var arr = [];
    queue.songs.slice(0, 10).forEach(song => arr.push(song));
    const q = await arr.map((song, i) => `${i + 1}. [${song.title}](${song.url}) - \`${song.duration}\``).join(`\n`);
    const embed = new MessageEmbed()
      .setAuthor(`Music queue for ${message.guild.name}`, queue.playing ? 'https://emoji.gg/assets/emoji/6935_Plak_Emoji.gif' : 'https://imgur.com/Y9XRC6N.png')
      .setDescription(q)
      .setThumbnail(queue.songs[0].thumbnail)
      .setColor(message.member.displayHexColor || 'BLUE')
      .setFooter(`Showing the first 10 songs of the queue! | ${queue.repeat === '24/7' ? repeats['queue'] : repeats[queue.repeat]}`)
    await message.channel.send(embed)
  }
}