const mongoose = require('mongoose');

const StartupSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    app_role: String,
    tokens: [String],
    name: String,
    description: String,
    sector: String,
    web: String,
    stage: String,
    raised_rounds: Number,
    awards: [String],
    contact_role: String,
    role: String,
    logo: String,
  },
  { timestamps: true }
);

const Startup = mongoose.model('Startup', StartupSchema);

module.exports = Startup;
