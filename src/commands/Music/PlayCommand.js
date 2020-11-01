const BaseCommand = require('../../utils/structures/BaseCommand');
const { play }  = require('../../utils/functions/music');
const playlist = require('../../utils/functions/playlist');
const emojiFinder = require('../../utils/functions/emoji');

const ytdl = require("ytdl-core");
const ytsearch = require('yt-search');
const { MessageEmbed } = require('discord.js');

module.exports = class PlayCommand extends BaseCommand {
  constructor() {
    super('play', 'Music', ['pl', 'p'], 'Play a song/playlist from youtube!', 'play <song/playlist link/name>');
  }

  async run(client, message, args) {
    const targetsong = args.join(" ");
    const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const videoPattern2 = /^(https?:\/\/)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const playlistPattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
    const urlcheck = videoPattern.test(args[0]);
    const serverQueue = client.queue.get(message.guild.id);
    const { channel } = message.member.voice;

    if (!channel) return message.channel.send(`> 🔇 You aren't in a voice channel!`);
    if (serverQueue && message.channel.id !== serverQueue.textChannel.id) return message.channel.send(`> 🔇 I am currently bound to ${serverQueue.textChannel.toString()}!`);
    if (message.guild.me.voice.channel && message.guild.me.voice.channel.id !== message.member.voice.channel.id) return message.channel.send(`> 🔇 I am currently bound to ${message.guild.me.voice.channel.name}!`);

    if (!targetsong && !serverQueue) return message.channel.send(`> Can not play a song without a url/name!`);
    else if (!targetsong && !serverQueue.playing) {
      if (message.guild.me.voice.channel.id !== message.member.voice.channel.id) return message.channel.send(`> ${emojiFinder(client, 'redtick').toString()} we aren't in the same voice channel!`);
      serverQueue.connection.dispatcher.resume();
      serverQueue.playing = true;
      return message.channel.send(`> ▶ Successfully resumed the player!`);
    };

    if (!videoPattern.test(args[0]) && !videoPattern2.test(args[0]) && playlistPattern.test(args[0])) {
      return playlist(client, message, args[0]);
    };
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
    
    let songData;
    let song;
    let cancel = false;
    if (urlcheck) {
      let s = await ytdl.getInfo(targetsong);
      songData = await ytsearch({ videoId: s.videoDetails.videoId });
      song = {
        requester: message.author,
        title: songData.title,
        url: songData.url,
        duration: songData.timestamp,
        durationSeconds: songData.seconds,
        thumbnail: songData.thumbnail,
      };

      if (serverQueue && !cancel) {
        if (serverQueue.songs.length > 40 && !client.premium.get(message.guild.id)) return message.channel.send(`> ${client.emojis.cache.find(m => m.name === 'redtick').toString()} The queue already has 40 songs, if you want to add more you have to upgrade to our premium version`);
        serverQueue.songs.push(song);
        return serverQueue.textChannel.send(`> ${client.emojis.cache.find(m => m.name === 'greentick').toString()} Successfully added **${song.title}** to the queue!`);
      } else if (!serverQueue && !cancel) {
        queueConstruct.songs.push(song);
        client.queue.set(message.guild.id, queueConstruct);
        client.vote.set(message.guild.id, voteConstruct);
        queueConstruct.connection = await channel.join();
        await queueConstruct.connection.voice.setSelfDeaf(true);
        return play(client, message, queueConstruct.songs[0]);
      };

    } else {
      const filter = m => { 
        return m.author.id === message.author.id && new RegExp(`^([1-9]|10|cancel)$`, 'i').test(m.content)
      }
      songData = await ytsearch(targetsong);
      let songs = songData.videos.slice(0, 10);
      const embed = new MessageEmbed()
      .setTitle(`Search results for: ${targetsong}`)
      .setDescription(songs.map((s, i) => `**${i + 1}.** [${s.title}](${s.url})`))
      .setFooter(`This prompt will close in 60 seconds!`)
      .setThumbnail(songs[0].thumbnail)
      .setColor(message.member.displayHexColor ? message.member.displayHexColor : 'BLUE')
      await message.channel.send(embed)

      const collector = await message.channel.createMessageCollector(filter, { max: 1, time: 60000 });
      await collector.on('collect',async (m) => {
        if (/cancel/i.test(m.content)) return collector.stop('cancelled');
        let s = songs[parseInt(m.content) - 1];
        song = {
          requester: message.author,
          title: s.title,
          url: s.url,
          duration: s.timestamp,
          durationSeconds: s.seconds,
          thumbnail: s.thumbnail,
        };

        if (serverQueue && !cancel) {
          if (serverQueue.songs.length > 40 && !client.premium.get(message.guild.id)) return message.channel.send(`> ${client.emojis.cache.find(m => m.name === 'redtick').toString()} The queue already has 40 songs, if you want to add more you have to upgrade to our premium version`);
          serverQueue.songs.push(song);
          return serverQueue.textChannel.send(`> ${client.emojis.cache.find(m => m.name === 'greentick').toString()} Successfully added **${song.title}** to the queue!`);
        } else if (!serverQueue && !cancel) {
          queueConstruct.songs.push(song);
          client.queue.set(message.guild.id, queueConstruct);
          client.vote.set(message.guild.id, voteConstruct);
          queueConstruct.connection = await channel.join();
          await queueConstruct.connection.voice.setSelfDeaf(true);
          return play(client, message, queueConstruct.songs[0]);
        };
      });

      await collector.on('end', (_, reason) => {
        if (['time'].includes(reason)) message.channel.send(`> ${emojiFinder(client, 'redtick')} Prompt is closed | No response within 60 seconds!`);
        else if (['cancelled'].includes(reason)) message.channel.send(`> ${emojiFinder(client, 'redtick')} Prompt is canceled!`);
        cancel = true;
      });
    };
  };
};
