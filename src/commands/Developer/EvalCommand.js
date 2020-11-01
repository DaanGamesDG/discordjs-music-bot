const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const { post } = require('node-superfetch');

module.exports = class EvalCommand extends BaseCommand {
  constructor() {
    super('eval', 'Developer', ['e'], 'Why are you looking at this 👀', 'eval <code>');
  }

  async run(client, message, args) {
    if (!client.owners.includes(message.author.id)) return message.channel.send(`> 🎵 I'm looking for my owner, can you help me searching?`);
      
    const embed = new MessageEmbed()
      .addField("📥 Input", "```js\n" + args.join(" ") + "```");
    
    try {
      const code = args.join(" ");
      if (!code) return message.channel.send(`> No code provided!`);
      let evaled;
      
      if (code.includes(`KEY`) || code.includes(`SECRET`) || code.includes(`TOKEN`)) evaled = "I am not allowed to give people my food🦴";
      else evaled = eval(code);
      
      if (typeof evaled !== "string") evaled = require("util").inspect(evaled, {depth: 0});
      
      let output = clean(evaled);
      if (output.length > 1024) {
        const { body } = await post("https://hastebin.com/documents").send(output);
        embed.addField("📄 Output", `https://hastebin.com/${body.key}.js`).setColor(0x7289DA);
      } else embed.addField("📄 Output", "```js\n" + output + "```").setColor(0x7289DA)
      message.channel.send(embed);
    } catch (error) {
      let err = clean(error);
      if (err.length > 1024) {
        const { body } = await post("https://hastebin.com/documents").send(err);
        embed.addField("⚠️ Output", `https://hastebin.com/${body.key}.js`).setColor("RED");
      } else {
        embed.addField("⚠️ Output", "```js\n" + err + "```").setColor("RED");
      }
      
      message.channel.send(embed);
    }
  }
}

function clean(string) {
  if (typeof text === "string") {
    return string.replace(/`/g, "`" + String.fromCharCode(8203))
    .replace(/@/g, "@" + String.fromCharCode(8203))
  } else {
    return string;
  }
}