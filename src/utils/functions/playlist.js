const { play } = require('../../utils/functions/music');
const emojiFinder = require('../functions/emoji');
const ytsearch = require('yt-search');
/**
 * 
 * @param {Object} client the discord client
 * @param {Object} message the message
 * @param {URL} playlistLink the playlist url
 */
async function playlist(client, message, playlistLink) {
  const { channel } = message.member.voice;
  if (!client.queue.get(message.guild.id)) {
    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      repeat: 'none',
      volume: 100,
      playing: true
    }
    const voteConstruct = {
      votes: 0,
      users: []
    }
    await client.vote.set(message.guild.id, voteConstruct);
    await client.queue.set(message.guild.id, queueConstruct);
  }

  let queue = client.queue.get(message.guild.id);
  const playlistId = playlistLink.split('=');
  const playlist = await ytsearch({ listId: playlistId[1] });
  const videos = playlist.videos;
  let index = 0;
  if (queue.songs.length + playlist.videos.length > 40 && !client.premium.get(message.guild.id)) return message.channel.send(`> ${client.emojis.cache.find(m => m.name === 'redtick').toString()} The queue already has 40 songs, if you want to add more you have to upgrade to our premium version`);
  message.channel.send(`> ${client.emojis.cache.find(m => m.name === 'loading').toString()} enqueuing ${playlist.videos.length} song(s)... \n *📓 Note: I will start playing the first song on the list while I am enqueuing the other songs.*`).then(async m => {
    for (const video of Object.values(videos)) {
      const vid = await ytsearch({ videoId: video.videoId });
      try {
        let song = {
          requester: message.author,
          title: vid.title,
          url: vid.url,
          duration: vid.timestamp,
          durationSeconds: vid.seconds,
          thumbnail: vid.thumbnail,
        };
        await queue.songs.push(song);
        queue.connection = await channel.join();
        await queue.connection.voice.setSelfDeaf(true);
        if (index === 0) {
          play(client, message, song);
          index = 1;
        };
      } catch (error) {
        console.log(error);
      }
    }
    //m.edit(`> ${client.emojis.cache.find(m => m.name === 'disc_emoji').toString()} Successfully added **${videos.length}** songs to the queue!`)
    m.channel.send(`> ${emojiFinder(client, 'disc_emoji').toString()} Successfully Enqueued **${videos.length}** songs!`);
    /*queue.connection = await channel.join();
    await queue.connection.voice.setSelfDeaf(true);
    play(client, message, queue.songs[0]);*/
  })
}

module.exports = playlist;