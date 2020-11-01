/**
 * 
 * @param {Object} client the discord client 
 * @param {Object} message the message object
 */
async function shuffle(client, message) {
  let queue = client.queue.get(message.guild.id);
  if (!queue) throw error(`Unknown queue`);
  let songQueue = [];
  /*let firstSong = queue.songs.shift();
  songQueue.push(firstSong);
  for (let i = queue.songs.length - 1; i > 0; i--) {
    songQueue.push(queue.songs[i]);
  }
  queue.songs = songQueue;*/

  let songs = queue.songs;
  for (let i = songs.length - 1; i > 1; i--) {
    let j = 1 + Math.floor(Math.random() * i);
    [songs[i], songs[j]] = [songs[j], songs[i]];
  }
  queue.songs = songs;
}

module.exports = shuffle;