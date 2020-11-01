const BaseCommand = require('../../utils/structures/BaseCommand');
const emojiFinder = require('../../utils/functions/emoji');

module.exports = class twentyfoursevenCommand extends BaseCommand {
  constructor() {
    super('247', 'Premium', ['24/7'], 'Toggles 24/7 on or off');
  }

  run(client, message, args) {
    const queue = client.queue.get(message.guild.id);
    //if (!client.premium.get(message.guild.id)) return message.channel.send(`> ${emojiFinder(client, 'redtick').toString()} You dont have the right permissions to do that!`);
    if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`> ${emojiFinder(client, 'redtick').toString()} You dont have the right permissions to do that!`);
    if (!queue && !queue.songs[0]) return message.channel.send(`> ${emojiFinder(client, 'redtick').toString()} This server doesnt have a queue!`);
    queue.repeat === '24/7' ? queue.repeat = 'none' : queue.repeat = '24/7';
    return message.channel.send(`> 🔁 24/7 changed to \`${queue.repeat === '24/7' ? 'true' : 'false'}\``);
  }
}