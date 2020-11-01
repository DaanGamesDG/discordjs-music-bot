const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class PingCommand extends BaseCommand {
  constructor() {
    super('ping', 'Info', ['pong'], 'Shows the edit and API latency');
  }

  run(client, message, args) {
    message.channel.send(`> ${client.emojis.cache.find(m => m.name === 'loading').toString()} Pinging...`).then(msg => {
      let editLatency = `${msg.createdTimestamp - Date.now()}`;
      let el = editLatency.startsWith('-') ? editLatency.slice(1) : editLatency;
      msg.edit(`> 🏓 Pong. Edit latency: \`${el}\` ms, API Latency: \`${client.ws.ping}\` ms.`);
    })
  }
}
