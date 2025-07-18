const mongoose = require('mongoose');

const MentorsSchema = new mongoose.Schema({
  business_name: { type: String, required: true },
  img_business: String,
  category: String,
  avaiable_dates: String,
  linkedin: String,
  business_link: String,
  extra_info: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Mentors', MentorsSchema); 

