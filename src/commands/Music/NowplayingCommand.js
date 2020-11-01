const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const createBar= require('string-progressbar');

const repeats = {
  queue: `**🔁 Repeat:** \`Queue\``,
  song: `**🔂 Repeat:** \`Song\``,
  none: `**▶ Repeat:** \`None\``
}
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('nowplaying', 'Music', ['np'], 'shows the song info that is currently playing');
  }

  async run(client, message, args) {
    const queue = client.queue.get(message.guild.id);
    const vote = client.vote.get(message.guild.id);
    if (!queue && !queue.songs[0]) return message.channel.send(`> ${client.emojis.cache.find(m => m.name === 'redtick').toString()} This server doesnt have a queue!`);
    
    const song = queue.songs[0];
    const songDuration = song.durationSeconds;
    const seek = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000;
    const left = song.duration - seek;
    
    const embed = new MessageEmbed()
    .setAuthor('Now Playing:', queue.playing ? 'https://emoji.gg/assets/emoji/6935_Plak_Emoji.gif' : 'https://imgur.com/Y9XRC6N.png')
    .setDescription([
      `**🎵 Song:** [${song.title}](${song.url})`,
      `**👤 Requested by** ${song.requester.toString()}`,
      `${queue.repeat === '24/7' ? repeats['queue'] : repeats[queue.repeat]}`,
      `**🔊 Volume:** \`${queue.volume / 100}\` \n`,
      `**↔️ Play Progress:** \`${new Date(seek * 1000).toISOString().substr(11, 8) + '\` ' + '/ \`' + (songDuration == 0 ? " ◉ LIVE" : new Date(songDuration * 1000).toISOString().substr(11, 8)) + '\`'}`,
      `${"[" + createBar((songDuration == 0 ? seek : songDuration), seek, 20, '▬', '⚪')[0] + "]"}`
    ])
    .setFooter(`${vote.votes} vote(s) to skip this song`)
    .setThumbnail(queue.songs[0].thumbnail)
    .setColor(message.guild.members.cache.get(song.requester.id).displayHexColor || 'BLUE')
    message.channel.send(embed)
  }
}