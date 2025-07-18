const mongoose = require('mongoose');

const MentorshipSchema = new mongoose.Schema({
 // mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentors', required: true },
  mentee: {
    name: String,
    email: String,
    company: String
  },
  date: { type: Date, required: true },
  durationHours: Number,
  notes: String,
  isCompleted: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Mentorship', MentorshipSchema);
