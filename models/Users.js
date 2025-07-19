const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  email: String,
  password: String,
  app_role: String,
  tokens: [String],
}, { timestamps: true });

const Users = mongoose.model('Users', UsersSchema);

module.exports = Users;