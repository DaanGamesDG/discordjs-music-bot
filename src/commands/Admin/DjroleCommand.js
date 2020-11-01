const BaseCommand = require('../../utils/structures/BaseCommand');
const emojiFinder = require('../../utils/functions/emoji');
const roleFinder = require(`../../utils/functions/role`);
const djrole = require('../../utils/models/djrole');
const ms = require('ms');

module.exports = class DjroleCommand extends BaseCommand {
  constructor() {
    super('djrole', 'Admin', ['djr', 'dj'], 'Changes the dj role in the database of the bot', 'djrole <role mention, name or id>');
  }

  async run(client, message, args) {
    let timeout = client.timeouts.get(message.author.id + '-' + this.name);
    if (timeout) return message.channel.send(`> ${emojiFinder(client, 'redtick').toString()} Please try again after ${ms(Date.now() - timeout, { long: true })}!`)
    if (!message.member.hasPermission(`MANAGE_GUILD`)) return message.channel.send(`> ${emojiFinder(client, 'redtick').toString()} You don't have the permissions to do that!`);
    if (!args[0]) return message.channel.send(`> ${emojiFinder(client, 'redtick').toString()} No role specified!`);
    let role = await roleFinder(message, args[0]);
    role === 'no role found' ? message.channel.send(`> ${emojiFinder(client, 'redtick').toString()} Can not find the role!`) :
      djrole.findOne({ guildId: message.guild.id }, async (err, data) => {
        if (err) console.log(err);
        if (!data) {
          new djrole({
            guildId: message.guild.id,
            djrole: role.id
          }).save();
          client.djrole.set(message.guild.id, role.id);
        } else {
          client.djrole.set(message.guild.id, role.id);
        };
      });
      message.channel.send(`> ${emojiFinder(client, 'greentick').toString()} DJ Role changed to ${role.name}!`);
      await client.timeouts.set(message.author.id + '-' + this.name, Date.now());
      setTimeout(() => client.timeouts.delete(message.author.id + '-' + this.name), 10000);
  }
}