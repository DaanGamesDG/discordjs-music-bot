const { Schema, model } = require('mongoose');
const schema = new Schema({
  guildId: {
    type: String,
    required: true,
  },
  djrole: {
    type: String,
    required: false,
  }
})
module.exports = model('djrole', schema);