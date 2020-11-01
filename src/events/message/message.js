const BaseEvent = require('../../utils/structures/BaseEvent');
const perms = ['EMBED_LINKS', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES', 'DEAFEN_MEMBERS', 'CONNECT', 'SPEAK', 'USE_EXTERNAL_EMOJIS'];

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }
  
  async run(client, message) {
    if (message.author.bot) return;
    let noPerms = [];
    //console.log(message.channel.permissionsFor(client.user).toArray())
    
    if (message.channel.type === 'dm') return;
    if ((message.content.startsWith(`<@${client.user.id}>`) || message.content.startsWith(`<@!${client.user.id}>`)) 
      && message.mentions.has(client.user)) 
        return client.commands.get('help').run(client, message, []);
    
    const prefix = client.prefix.get(message.guild.id) ? client.prefix.get(message.guild.id) : process.env.DISCORD_BOT_PREFIX;
    if (message.content.startsWith(prefix)) {
      const [cmdName, ...cmdArgs] = message.content
      .slice(prefix.length)
      .trim()
      .split(/\s+/);
      const command = client.commands.get(cmdName);
      if (command) {
        await perms.forEach(perm => {
          if (!message.channel.permissionsFor(client.user).has(perm)) noPerms.push(perm);
        });
        if (noPerms.length > 0) return message.channel.send('> I am missing the following permissions in this channel: ' + noPerms.map(perm => `\`${perm}\``).join(', '))
        command.run(client, message, cmdArgs);
      }
    }
  }
}