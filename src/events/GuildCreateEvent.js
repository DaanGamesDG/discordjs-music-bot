// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildCreate
const BaseEvent = require('../utils/structures/BaseEvent');
const prefixSchema = require('../utils/models/prefix');
const premium = require('../utils/models/premium');

module.exports = class GuildCreateEvent extends BaseEvent {
  constructor() {
    super('guildCreate');
  }
  
  async run(client, guild) {
    prefixSchema.findOne({ guildId : guild.id }, async (err, data) => {
      if (!data) {
        new prefixSchema({
          guildId: guild.id,
          prefix: process.env.DISCORD_BOT_PREFIX
        }).save();
        client.prefix.set(guild.id, process.env.DISCORD_BOT_PREFIX);
      } else {
        client.prefix.set(guild.id, data.prefix);
      };
    });
  }
}