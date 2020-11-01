const { Schema, model } = require('mongoose');
const schema = new Schema({
  guildId: {
    type: String,
    required: true,
  },
  prefix: {
    type: String,
    required: true,
    default: process.env.DISCORD_BOT_PREFIX
  }
})
module.exports = model('prefix', schema);