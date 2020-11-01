const BaseEvent = require('../../utils/structures/BaseEvent');
const prefixSchema = require('../../utils/models/prefix');
const djrole = require('../../utils/models/djrole');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client) {
    await client.guilds.cache.forEach(async guild => {
      await prefixSchema.findOne({ guildId: guild.id }, async (err, data) => {
        if (err) console.log(err);
        if (!data) {
          new prefixSchema({
            guildId: guild.id,
            prefix: process.env.DISCORD_BOT_PREFIX,
          }).save();
          return client.prefix.set(guild.id, process.env.DISCORD_BOT_PREFIX);
        };
        await client.prefix.set(guild.id, data.prefix);
      });

      await djrole.findOne({ guildId: guild.id }, async (err, data) => {
        if (err) console.log(err);
        if (data) client.djrole.set(guild.id, data.djrole);
      });
    });

    await client.user.setActivity(`${process.env.DISCORD_BOT_PREFIX}help | Music bot`, { type: 'LISTENING'});
    console.log(client.user.tag + ' has logged in.');
  }
}
