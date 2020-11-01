require('dotenv').config();
const { Client, Collection } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const assistanceBot = require('../stereo-assistance-bot/src/bot');
const mongoose = require('mongoose');
const client = new Client();

(async () => {
  client.commands = new Collection();
  client.cs = new Collection();
  client.events = new Collection();
  client.queue = new Collection();
  client.vote = new Collection();
  client.premium = new Collection();
  client.djrole = new Collection();
  client.prefix = new Map();
  client.timeouts = new Map();
  client.owners = ['304986851310043136', '715289819630141487', '624658532381360140'];
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await assistanceBot(process.env.ASSISTANCE_BOT_TOKEN, process.env.ASSISTANCE_BOT_PREFIX);
  await client.login(process.env.DISCORD_BOT_TOKEN);
})();

// mongoose events
mongoose.connect(process.env.DISCORD_DATABASE_TOKEN, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });
mongoose.connection.on("connected" , () => console.log('Mongoose Database successfully connected!'));
mongoose.connection.on("err" , err => console.error(`Mongoose Error:\n ${err.stack}`));
mongoose.connection.on("disconnected" , () => console.warn("Mongoose Connection Lost :("));
