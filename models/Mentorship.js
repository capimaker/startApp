const mongoose = require('mongoose');

const MentorshipSchema = new mongoose.Schema({
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentors', required: true },
  //mentee: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentee', required: true },
  date: { type: Date, required: true },
  durationHours: Number,
  notes: String,
  isCompleted: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Mentorship', MentorshipSchema);