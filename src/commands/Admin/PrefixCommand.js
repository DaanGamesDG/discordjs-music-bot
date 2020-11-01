const BaseCommand = require('../../utils/structures/BaseCommand');
const prefixSchema = require('../../utils/models/prefix');
const ms = require('ms');

module.exports = class PrefixCommand extends BaseCommand {
  constructor() {
    super('prefix', 'Admin', [], 'Changes the prefix of the server', 'prefix <prefix(max 3 characters long)>');
  }

  async run(client, message, args) {
    let timeout = client.timeouts.get(message.author.id + '-' + this.name);
    if (timeout) return message.channel.send(`> ${client.emojis.cache.find(m => m.name === 'redtick').toString()} Please try again after ${ms(Date.now() - timeout, { long: true })}!`);
    if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`> ${client.emojis.cache.find(m => m.name === 'redtick').toString()} you don't have the permissions for that!`)
    if (!args[0]) return message.channel.send(`> ${client.emojis.cache.find(m => m.name === 'redtick').toString()} no prefix specified!`);
    if (args[0].length > 3) return message.channel.send(`> ${client.emojis.cache.find(m => m.name === 'redtick').toString()} prefix has to be less then 3 characters long!`);
    await prefixSchema.findOneAndUpdate({ guildId: message.guild.id }, { prefix: args[0] }, error => { if (error) console.log(error) });
    await client.prefix.set(message.guild.id, args[0]);
    await client.timeouts.set(message.author.id + '-' + this.name, Date.now());
    message.channel.send(`> ${client.emojis.cache.find(m => m.name === 'greentick').toString()} prefix updated to \`${args[0]}\``);
    setTimeout(() => client.timeouts.delete(message.author.id + '-' + this.name), 10000);
  }
}