const ytdlDiscord = require('ytdl-core-discord');
const { MessageEmbed } = require('discord.js');
/**
 * 
 * @param {Object} client the discord client
 * @param {Object} message the message object
 * @param {Object} song the song object with the url, title, etc.
 */
async function play(client, message, song) {
  const queue = client.queue.get(message.guild.id);
  const vote = client.vote.get(message.guild.id);
  if (!song) {
    await queue.textChannel.send(`> ${client.emojis.cache.find(m => m.name === 'greentick').toString()} Music List finished!`);
    await client.vote.delete(message.guild.id);
    return client.queue.delete(message.guild.id);
  };
  
  vote.votes = 0;
  vote.users = [];
  
  if (queue.connection.channel.members.size - 1 === 0 && queue.repeat !== '24/7') {
        client.vote.delete(message.guild.id);
        await queue.connection.channel.leave();
        return client.queue.delete(message.guild.id);
  };
  
  try {
    var stream = await ytdlDiscord(song.url, { highWaterMark: 1 << 25 });
  } catch (error) {
    await queue.songs.shift();
    await queue.textChannel.send(`> ${client.emojis.cache.find(m => m.name === 'redtick').toString()} an unexpected error happend: \n ${error.message}. \n Pease report this to our staff team if this keeps happening with other songs!`);
    play(client, message, queue.songs[0]);
  };

  const dispatcher = queue.connection
    .play(stream, { type: 'opus', bitrate: 192000 })
    .on('finish', async () => {
      if (queue.repeat == 'queue' || queue.repeat === '24/7') {
        let lastSong = queue.songs.shift();
        queue.songs.push(lastSong);
        play(client, message, queue.songs[0]);
      } else if (queue.repeat === 'song') {
        play(client, message, queue.songs[0]);
      } else {
        queue.songs.shift();
        play(client, message, queue.songs[0]);
      }
    })
    .on('error', error => {
      console.log(error);
      return message.channel.send(`> ${client.emojis.cache.find(m => m.name === 'redtick').toString()} Oops, an error occured when trying to play the song: ${error.message}. \n Pease report this to our staff team if this keeps happening with other songs!`);
    })

    dispatcher.setVolumeLogarithmic(queue.volume / 100);
    const embed = new MessageEmbed()
      .setAuthor(`Now playing:`, `https://emoji.gg/assets/emoji/6935_Plak_Emoji.gif`)
      .setDescription([
        `🎵 **Song:** [${song.title}](${song.url})`,
         `👤 **Requested by** ${song.requester.toString()}`,
         `↔ **Duration:** \`${song.duration}\``
    ])
      .setThumbnail(song.thumbnail)
      .setColor(message.guild.members.cache.get(song.requester.id).displayHexColor || 'BLUE')
    message.channel.send(embed);
}

function formatDuration(durationObj) {
  const duration = `${durationObj.hours ? (durationObj.hours + ':') : ''}${
    durationObj.minutes ? durationObj.minutes : '00'}:${
      (durationObj.seconds < 10) ? ('0' + durationObj.seconds) : (durationObj.seconds ? durationObj.seconds : '00')
    }`
    return duration;
}

module.exports = { play };
