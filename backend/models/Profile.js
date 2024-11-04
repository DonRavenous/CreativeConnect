const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ['artist', 'business'], required: true },
  bio: { type: String },
  profilePic: { type: String },
  mediums: [{ type: String }],
  portfolioPics: [{ type: String }],
  servicesNeeded: { type: String },
  partnershipOpportunities: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Profile', profileSchema);